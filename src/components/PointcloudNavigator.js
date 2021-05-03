import React from "react";

// import vanillaJS Potree libs, /!\ would be best with proper ES6 import
const Potree = window.Potree;
const THREE = window.THREE;
const TWEEN = window.TWEEN;

export default class PointcloudNavigator extends React.Component {
  constructor(props) {
    super(props);
    this.potreeContainerDiv = React.createRef();
  }

  render() {
    return (
      <div className="potree_container">
        <div id="potree_render_area" ref={this.potreeContainerDiv}></div>
        <div id="potree_sidebar_container"> </div>
      </div>
    );
  }

  componentDidMount() {
    // initialize Potree viewer
    const viewerElem = this.potreeContainerDiv.current;
    this.viewer = new Potree.Viewer(viewerElem);

    this.viewer.setEDLEnabled(false);
    this.viewer.setFOV(60);
    this.viewer.setPointBudget(750e3);
    // this.viewer.setClipTask(Potree.ClipTask.SHOW_INSIDE);
    this.viewer.loadSettingsFromURL();

    // this.viewer.setControls(this.viewer.earthControls);

    this.viewer.loadGUI(() => {
      this.viewer.setLanguage("en");
      // window.$("#menu_appearance").next().show();
      // window.$("#menu_tools").next().show();
      // window.$("#menu_clipping").next().show();
      // this.viewer.toggleSidebar();
    });

    // Load and add point cloud to scene
    let url = `./pointclouds/pedret/model_10_100/metadata.json`;
    Potree.loadPointCloud(url).then(
      (e) => {
        let scene = this.viewer.scene;
        let pointcloud = e.pointcloud;
        let material = pointcloud.material;

        // material.activeAttributeName = "rgba";
        material.minSize = 1;
        material.pointSizeType = Potree.PointSizeType.ADAPTIVE;
        material.shape = Potree.PointShape.SQUARE;

        scene.addPointCloud(pointcloud);

        // Set the default camera
        scene.view.position.set(...this.props.DefaultCamera.pos);
        scene.view.lookAt(...this.props.DefaultCamera.target);

        let volume = new Potree.BoxVolume();
        volume.name = this.props.bb.box7.name;
        volume.position.set(...this.props.bb.box7.pos);
        volume.scale.set(...this.props.bb.box7.siz);
        volume.rotation.set(...this.props.bb.box7.rot);
        volume.clip = true;
        volume.visible = false;

        // scene.addVolume(volume);
        this.viewer.setClipTask(Potree.ClipTask.SHOW_INSIDE);

        // This forces the camera to fit the scene in the screen
        // Disable to define a custom camera position and lookAt
        // this.viewer.fitToScreen();
      },
      (e) => console.err("ERROR: ", e)
    );
  }

  componentDidUpdate() {
    // If you want to update Potree View/other element upon render(), put it here
  }
}
