import React from "react";
import { LangContext } from "../config/lang-context";

import BoundingBoxes, {
  ViewType,
  Cameras,
  CleanUpBoundingBoxes,
  AnimationRoutes,
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
      right: this.props.viewConfig.compass ? "5rem" : "0.25rem",
      zIndex: "3",
      color: "white",
      backgroundColor: "rgba(15, 15, 15, 0.75)",
      padding: "0 0.25rem",
      boxShadow: "0px 0px 8px 8px rgba(15, 15, 15, 0.75)",
    };

    // Did the user select only one room?
    // Returns [bool, int] representing
    // 1) Wether or not there is just one room selected
    // 2) If so, index of the room
    this.justOneRoom = () => {
      let index = -1;
      let count = 0;
      // We skip activeBB[0], which is PLANT view bb
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
              {window.viewer && !this.props.viewConfig.controls
                ? `${
                    lang.pointCloudViewer.speed
                  } = ${window.viewer.moveSpeed.toFixed(2)}`
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
    window.viewer = new Potree.Viewer(viewerElem);

    window.viewer.setEDLEnabled(this.props.viewConfig.edl);
    window.viewer.setFOV(this.props.viewConfig.fov || 60);
    window.viewer.setPointBudget(this.props.viewConfig.pointBudget || 1e6);
    window.viewer.loadSettingsFromURL();
    // window.viewer.showAbout();

    window.viewer.loadGUI(() => {
      // Set language, no catalan for Potree unfortunately :(
      window.viewer.setLanguage(
        this.context[2] === "ca" ? "en" : this.context[2]
      );
      window.$("#menu_appearance").next().show();
      window.$("#menu_tools").next().show();
      window.$("#menu_clipping").next().show();
      // window.viewer.toggleSidebar();
    });

    // Load and add point cloud to scene
    let url = `./pointclouds/pedret/model_100_100/metadata.json`;
    Potree.loadPointCloud(url).then(
      (e) => {
        let scene = window.viewer.scene;
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
        window.viewer.setControls(
          this.props.viewConfig.controls
            ? window.viewer.orbitControls
            : window.viewer.fpControls
        );
        window.viewer.setMoveSpeed(5);

        // ========================== CAMERAS ========================== //

        // Set the camera for FULL view
        if (this.props.viewType === ViewType.FULL) {
          scene.view.setView(
            Cameras.defaultCam.pos,
            Cameras.defaultCam.target,
            2000
          );
        }

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
              2500
            );
          }
        }

        // ========================== BOUNDING BOXES ========================== //

        // Clean noise under the monument with CleanUpBoundingBoxes
        // For all views except SELECTION
        if (this.props.viewType !== ViewType.SELECTION) {
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
        // SELECTION -> INSIDE, REST -> OUTSIDE
        window.viewer.setClipTask(
          this.props.viewType !== ViewType.SELECTION
            ? Potree.ClipTask.SHOW_OUTSIDE
            : Potree.ClipTask.SHOW_INSIDE
        );

        // ========================== CAMERA ANIMATIONS ========================== //

        if (this.props.viewType === ViewType.ROUTE_EXTERIOR) {
          const animation = new Potree.CameraAnimation(window.viewer);
          for (let i = 0; i < AnimationRoutes.exterior.positions.length; i++) {
            const cp = animation.createControlPoint();
            cp.position.set(...AnimationRoutes.exterior.positions[i]);
            cp.target.set(...AnimationRoutes.exterior.targets[i]);
          }
          animation.visible = false;
          animation.duration = AnimationRoutes.exterior.duration;
          scene.addCameraAnimation(animation);
          scene.cameraAnimations[0].play();
          // setTimeout(() => {
          //   scene.cameraAnimations = [];
          // }, 5000);
        }

        if (this.props.viewType === ViewType.ROUTE_APSIDIOLE) {
          const animation = new Potree.CameraAnimation(window.viewer);
          for (let i = 0; i < AnimationRoutes.apsidiole.positions.length; i++) {
            const cp = animation.createControlPoint();
            cp.position.set(...AnimationRoutes.apsidiole.positions[i]);
            cp.target.set(...AnimationRoutes.apsidiole.targets[i]);
          }
          animation.visible = false;
          animation.duration = AnimationRoutes.apsidiole.duration;
          scene.addCameraAnimation(animation);
          scene.cameraAnimations[0].play();
        }

        // for (let i = 0; i < scene.cameraAnimations.length; i++) {
        //   console.log(scene.cameraAnimations[i]);
        // }

        // const animation = new Potree.CameraAnimation(window.viewer);
        // const animationPositions = [
        //   [-3.47, 14.931, 6.586],
        //   [-13.259, 7.903, 10.499],
        //   [-12.744, -7.151, 12.212],
        // ];
        // const animationTargets = [
        //   [2.076, 1.095, 4.916],
        //   [-3.904, 1.705, 5.842],
        //   [-3.387, -1.821, 6.586],
        // ];

        // for (let i = 0; i < animationPositions.length; i++) {
        //   const cp = animation.createControlPoint();
        //   cp.position.set(...animationPositions[i]);
        //   cp.target.set(...animationTargets[i]);
        // }

        // animation.visible = false;
        // animation.duration = 5;

        // scene.addCameraAnimation(animation);

        // const animation2 = new Potree.CameraAnimation(window.viewer);
        // const animationPositions2 = [
        //   [3.222, 2.375, 5.016],
        //   [-0.681, -0.65, 5.06],
        //   [-3.685, 3.133, 4.96],
        // ];
        // const animationTargets2 = [
        //   [2.566, 0.878, 4.207],
        //   [-3.904, 1.705, 5.842],
        //   [-7.427, 0.346, 5.585],
        // ];

        // for (let i = 0; i < animationPositions.length; i++) {
        //   const cp = animation2.createControlPoint();
        //   cp.position.set(...animationPositions2[i]);
        //   cp.target.set(...animationTargets2[i]);
        // }

        // animation2.visible = false;
        // animation2.duration = 3;

        // scene.addCameraAnimation(animation2);

        // console.log(scene.cameraAnimations);
        // scene.cameraAnimations[0].play();
        // setTimeout(() => scene.cameraAnimations[1].play(), 5500);

        // ========================== STATE & OTHERS ========================== //

        // This forces the camera to fit the scene in the screen
        // Disable to define a custom camera position and lookAt
        // window.viewer.fitToScreen();

        this.setState({
          speed: window.viewer.getMoveSpeed(),
        });

        document.getElementById("potree_render_area").focus();
        window.addEventListener("wheel", (e) => this.forceUpdate());
        window.viewer.compass.setVisible(this.props.viewConfig.compass);
      },
      (e) => console.err("ERROR: ", e)
    );
  }

  componentDidUpdate() {
    // If you want to update Potree View/other element upon render(), put it here
  }
}

// Set contextType in order to access LangContext
// outside of render(), i.e: in lifecycle methods
PointCloudViewer.contextType = LangContext;
