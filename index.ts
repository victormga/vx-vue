/* eslint-disable no-param-reassign */
import vue from "vue";

import "./assets/sizes.css";
import "./assets/themes.css";
import "./assets/main.css";

import VxLib from "./lib/VxLib";

import VxApp from "./components/VxApp.vue";

import Accordeon from "./components/Accordeon.vue";
import Bar from "./components/Bar.vue";
import Button from "./components/Button.vue";
import Column from "./components/Column.vue";
import Container from "./components/Container.vue";
import Dialog from "./components/Dialog.vue";
import Drawer from "./components/Drawer.vue";
import Dropdown from "./components/Dropdown.vue";
import Float from "./components/Float.vue";
import Icon from "./components/Icon.vue";
import Image from "./components/Image.vue";
import Input from "./components/Input.vue";
import Modal from "./components/Modal.vue";
import Row from "./components/Row.vue";
import Spacer from "./components/Spacer.vue";
import Text from "./components/Text.vue";
import Timeline from "./components/Timeline.vue";
import Toast from "./components/Toast.vue";
import VirtualGrid from "./components/VirtualGrid.vue";
import VirtualList from "./components/VirtualList.vue";

export default function(app: vue.App<Element>): void {
	app.config.globalProperties.$vx = new VxLib();

	app.component("vx-app", VxApp);

	app.component("vx-accordeon", Accordeon);
	app.component("vx-bar", Bar);
	app.component("vx-button", Button);
	app.component("vx-column", Column);
	app.component("vx-container", Container);
	app.component("vx-dialog", Dialog);
	app.component("vx-drawer", Drawer);
	app.component("vx-dropdown", Dropdown);
	app.component("vx-float", Float);
	app.component("vx-icon", Icon);
	app.component("vx-image", Image);
	app.component("vx-input", Input);
	app.component("vx-modal", Modal);
	app.component("vx-row", Row);
	app.component("vx-spacer", Spacer);
	app.component("vx-text", Text);
	app.component("vx-timeline", Timeline);
	app.component("vx-toast", Toast);
	app.component("vx-virtual-grid", VirtualGrid);
	app.component("vx-virtual-list", VirtualList);
}

// const install: vue.PluginInstallFunction = function
