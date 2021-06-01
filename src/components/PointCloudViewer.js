import React from "react";
import { LangContext } from "../config/lang-context";

import BoundingBoxes, {
  ViewType,
  Cameras,
  CleanUpBoundingBoxes,
} from "../config/viewer-variables";

// import vanillaJS Potree libs, /!\ would be best with proper ES6 import
const Potree = window.Potree;
const THREE = window.THREE;
const TWEEN = window.TWEEN;

export default class PointCloudViewer extends React.Component {
  constructor(props) {
    super(props);
    this.potreeContainerDiv = React.createRef();

    this.state = {
      speed: 5,
    };

    this.speedSpanStyle = {
      position: "absolute",
      top: "0%",
      right: "0.25rem",
      zIndex: "3",
      backgroundColor: "rgba(15, 15, 15, 0.75)",
      padding: "0 0.25rem",
      boxShadow: "0px 0px 8px 8px rgba(15, 15, 15, 0.75)",
    };

    window.addEventListener("wheel", (e) => this.forceUpdate());

    // Did the user select only one room?
    // Returns [bool, int] representing
    // 1) Wether or not there is just one room selected
    // 2) If so, index of the room
    this.justOneRoom = () => {
      let index = -1;
      let count = 0;
      // We skeep activeBB[0] wichi is PLANT view
      for (let i = 1; i < this.props.activeBB.length; i++) {
        if (this.props.activeBB[i]) {
          index = i;
          count++;
        }
      }
      return [count === 1, index];
    };
  }

  render() {
    return (
      <LangContext.Consumer>
        {([lang, changeLang, l]) => (
          <div className="potree_container">
            <div id="potree_render_area" ref={this.potreeContainerDiv}></div>
            <div id="potree_sidebar_container"> </div>
            <span style={this.speedSpanStyle}>
              {this.viewer && !this.props.viewConfig.controls
                ? `${
                    lang.pointCloudViewer.speed
                  } = ${this.viewer.moveSpeed.toFixed(2)}`
                : ""}
            </span>
          </div>
        )}
      </LangContext.Consumer>
    );
  }

  componentDidMount() {
    // initialize Potree viewer
    const viewerElem = this.potreeContainerDiv.current;
    this.viewer = new Potree.Viewer(viewerElem);

    this.viewer.setEDLEnabled(this.props.viewConfig.edl);
    this.viewer.setFOV(this.props.viewConfig.fov || 60);
    this.viewer.setPointBudget(this.props.viewConfig.pointBudget || 1e6);
    this.viewer.loadSettingsFromURL();
    // this.viewer.showAbout();

    this.viewer.loadGUI(() => {
      // Set language, no catalan for Potree unfortunately :(
      this.viewer.setLanguage(this.props.lang);
      window.$("#menu_appearance").next().show();
      window.$("#menu_tools").next().show();
      window.$("#menu_clipping").next().show();
      this.viewer.toggleSidebar();
    });

    // Load and add point cloud to scene
    let url = `./pointclouds/pedret/model_100_100/metadata.json`;
    Potree.loadPointCloud(url).then(
      (e) => {
        let scene = this.viewer.scene;
        let pointcloud = e.pointcloud;
        let material = pointcloud.material;

        // material.activeAttributeName = "rgba";
        material.minSize = 1;
        material.pointSizeType = Potree.PointSizeType.ADAPTIVE;
        material.shape = this.props.viewConfig.pointQuality
          ? Potree.PointShape.CIRCLE
          : Potree.PointShape.SQUARE;

        scene.addPointCloud(pointcloud);

        // Set navigation controls and movement speed
        this.viewer.setControls(
          this.props.viewConfig.controls
            ? this.viewer.orbitControls
            : this.viewer.fpControls
        );
        this.viewer.setMoveSpeed(5);

        // ========================== CAMERAS ========================== //

        // Set the default camera
        scene.view.setView(
          Cameras.defaultCam.pos,
          Cameras.defaultCam.target,
          2000
        );

        // Reset camera for PLANT view
        if (this.props.viewType === ViewType.PLANT) {
          scene.view.setView(Cameras["0"].pos, Cameras["0"].target, 2000);
        }

        // Reset camera for SELECTION view
        if (this.props.viewType === ViewType.SELECTION) {
          scene.view.setView(
            Cameras.defaultSelection.pos,
            Cameras.defaultSelection.target,
            2000
          );
          // Reset again if just one room is selected
          const [one, room] = this.justOneRoom();
          if (one) {
            scene.view.setView(
              Cameras[room.toString()].pos,
              Cameras[room.toString()].target,
              3000
            );
          }
        }

        // ========================== BOUNDING BOXES ========================== //

        // Clean noise under the monument with CleanUpBoundingBoxes
        // Only for FULL and PLANT views
        if (
          this.props.viewType === ViewType.FULL ||
          this.props.viewType === ViewType.PLANT
        ) {
          const volume0 = new Potree.BoxVolume();
          const volume1 = new Potree.BoxVolume();
          volume0.name = CleanUpBoundingBoxes[0].name;
          volume1.name = CleanUpBoundingBoxes[1].name;
          volume0.position.set(...CleanUpBoundingBoxes[0].pos);
          volume1.position.set(...CleanUpBoundingBoxes[1].pos);
          volume0.scale.set(...CleanUpBoundingBoxes[0].siz);
          volume1.scale.set(...CleanUpBoundingBoxes[1].siz);
          volume0.rotation.set(...CleanUpBoundingBoxes[0].rot);
          volume1.rotation.set(...CleanUpBoundingBoxes[1].rot);
          volume0.clip = true;
          volume1.clip = true;
          volume0.visible = false;
          volume1.visible = false;
          scene.addVolume(volume0);
          scene.addVolume(volume1);
        }

        // Set Bounding Boxes
        if (this.props.viewType === ViewType.PLANT) {
          let volume = new Potree.BoxVolume();
          volume.name = BoundingBoxes[0].name;
          volume.position.set(...BoundingBoxes[0].pos);
          volume.scale.set(...BoundingBoxes[0].siz);
          volume.rotation.set(...BoundingBoxes[0].rot);
          volume.clip = true;
          volume.visible = false;
          scene.addVolume(volume);
        } else if (this.props.viewType === ViewType.SELECTION) {
          for (let i = 1; i < BoundingBoxes.length; i++) {
            if (this.props.activeBB[i]) {
              let volume = new Potree.BoxVolume();
              volume.name = BoundingBoxes[i].name;
              volume.position.set(...BoundingBoxes[i].pos);
              volume.scale.set(...BoundingBoxes[i].siz);
              volume.rotation.set(...BoundingBoxes[i].rot);
              volume.clip = true;
              volume.visible = false;
              scene.addVolume(volume);
            }
          }
        }

        // Set clipping area for Bounding Boxes
        // FULL || PLANT -> OUTSIDE, SELECTION -> INSIDE
        this.viewer.setClipTask(
          this.props.viewType === ViewType.FULL ||
            this.props.viewType === ViewType.PLANT
            ? Potree.ClipTask.SHOW_OUTSIDE
            : Potree.ClipTask.SHOW_INSIDE
        );

        // This forces the camera to fit the scene in the screen
        // Disable to define a custom camera position and lookAt
        // this.viewer.fitToScreen();

        this.setState({
          speed: this.viewer.getMoveSpeed(),
        });

        document.getElementById("potree_render_area").focus();
      },
      (e) => console.err("ERROR: ", e)
    );
  }

  componentDidUpdate() {
    // If you want to update Potree View/other element upon render(), put it here
  }
}
