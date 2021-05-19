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
    this.viewer.setPointBudget(7500e3);
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
        scene.view.position.set(...this.props.cameras.defaultCam.pos);
        scene.view.lookAt(...this.props.cameras.defaultCam.target);

        // 10% vs 100% resolution comparison
        // scene.view.position.set(-5.122, 2.026, 5.249);
        // scene.view.lookAt(-8.141, -0.247, 9.1);

        // Reset cameras if necessary depending on the active BB
        if (this.props.activeBB[0]) {
          scene.view.position.set(...this.props.cameras["0"].pos);
          scene.view.lookAt(...this.props.cameras["0"].target);
        }

        // If there is not any BB active, use cleanUp BB to clean basement
        const anyBB = this.props.activeBB.reduce((acc, curr) => acc || curr);
        if (!anyBB || this.props.activeBB[0]) {
          const volume0 = new Potree.BoxVolume();
          const volume1 = new Potree.BoxVolume();
          volume0.name = this.props.cleanUpBB[0].name;
          volume1.name = this.props.cleanUpBB[1].name;
          volume0.position.set(...this.props.cleanUpBB[0].pos);
          volume1.position.set(...this.props.cleanUpBB[1].pos);
          volume0.scale.set(...this.props.cleanUpBB[0].siz);
          volume1.scale.set(...this.props.cleanUpBB[1].siz);
          volume0.rotation.set(...this.props.cleanUpBB[0].rot);
          volume1.rotation.set(...this.props.cleanUpBB[1].rot);
          volume0.clip = true;
          volume1.clip = true;
          volume0.visible = false;
          volume1.visible = false;
          scene.addVolume(volume0);
          scene.addVolume(volume1);
        }

        // Set Bounding (clipping) Boxes
        for (let i = 0; i < this.props.bb.length; i++) {
          if (this.props.activeBB[i]) {
            let volume = new Potree.BoxVolume();
            volume.name = this.props.bb[i].name;
            volume.position.set(...this.props.bb[i].pos);
            volume.scale.set(...this.props.bb[i].siz);
            volume.rotation.set(...this.props.bb[i].rot);
            volume.clip = true;
            volume.visible = false;
            scene.addVolume(volume);
            if (i === 0) break;
          }
        }
        // If bb0 (no roof) set to clip outside, else clip inside
        this.viewer.setClipTask(
          this.props.activeBB[0]
            ? Potree.ClipTask.SHOW_OUTSIDE
            : !anyBB
            ? Potree.ClipTask.SHOW_OUTSIDE
            : Potree.ClipTask.SHOW_INSIDE
        );

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
