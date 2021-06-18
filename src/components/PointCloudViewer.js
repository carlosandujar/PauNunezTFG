import React from "react";
import { LangContext } from "../config/lang-context";

import BoundingBoxes, {
  ViewType,
  Cameras,
  CleanUpBoundingBoxes,
  AnimationRoutes,
  Annotations,
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

        // Set the default camera but not for Animated Routes
        if (this.props.viewType < ViewType.ROUTE_FULL) {
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

        // ========================== ANNOTATIONS ========================== //
        /*
        Annotations.forEach((a, i) => {
          a.title = this.context[0].pointCloudViewer.annotations[i].title;
          a.description =
            this.context[0].pointCloudViewer.annotations[i].description;
          scene.annotations.add(new Potree.Annotation(a));
        }); */

        // ========================== IMAGES ========================== //
        const cameraParamsPath = `/oriented_images/camera_params.xml`;
        const imageParamsPath = `/oriented_images/image_params.txt`;
        Potree.OrientedImageLoader.load(
          cameraParamsPath,
          imageParamsPath,
          window.viewer
        ).then((images) => {
          scene.addOrientedImages(images);
        });

        // ========================== CAMERA ANIMATIONS ========================== //

        if (this.props.viewType >= ViewType.ROUTE_FULL) {
          const animationExterior = new Potree.CameraAnimation(window.viewer);
          const animationApsidiole = new Potree.CameraAnimation(window.viewer);
          const animationInterior = new Potree.CameraAnimation(window.viewer);

          // Exterior
          for (let i = 0; i < AnimationRoutes.exterior.positions.length; i++) {
            const cp = animationExterior.createControlPoint();
            cp.position.set(...AnimationRoutes.exterior.positions[i]);
            cp.target.set(...AnimationRoutes.exterior.targets[i]);
          }
          // Apsidiole
          for (let i = 0; i < AnimationRoutes.apsidiole.positions.length; i++) {
            const cp = animationApsidiole.createControlPoint();
            cp.position.set(...AnimationRoutes.apsidiole.positions[i]);
            cp.target.set(...AnimationRoutes.apsidiole.targets[i]);
          }
          // Interior
          for (let i = 0; i < AnimationRoutes.interior.positions.length; i++) {
            const cp = animationInterior.createControlPoint();
            cp.position.set(...AnimationRoutes.interior.positions[i]);
            cp.target.set(...AnimationRoutes.interior.targets[i]);
          }

          animationExterior.visible = false;
          animationApsidiole.visible = false;
          animationInterior.visible = false;

          animationExterior.duration = AnimationRoutes.exterior.duration;
          animationApsidiole.duration = AnimationRoutes.apsidiole.duration;
          animationInterior.duration = AnimationRoutes.interior.duration;

          scene.addCameraAnimation(animationExterior); // [0]
          scene.addCameraAnimation(animationApsidiole); // [1]
          scene.addCameraAnimation(animationInterior); // [2]

          if (this.props.viewType === ViewType.ROUTE_EXTERIOR) {
            scene.cameraAnimations[0].play();
          } //
          else if (this.props.viewType === ViewType.ROUTE_APSIDIOLE) {
            scene.cameraAnimations[1].play();
          } //
          else if (this.props.viewType === ViewType.ROUTE_INTERIOR) {
            // Interior + Apsidiole
            scene.cameraAnimations[2].play();
            setTimeout(() => {
              scene.cameraAnimations[1].play();
            }, AnimationRoutes.interior.duration * 1e3);
          } //
          else {
            // Exterior + Interior + Apsidiole
            scene.cameraAnimations[0].play();
            setTimeout(() => {
              scene.cameraAnimations[2].play();
            }, AnimationRoutes.exterior.duration * 1e3);
            setTimeout(() => {
              scene.cameraAnimations[1].play();
            }, (AnimationRoutes.exterior.duration + AnimationRoutes.interior.duration) * 1e3);
          }
        }

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
