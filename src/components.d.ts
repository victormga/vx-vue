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
import Tooltip from "./components/Tooltip.vue";
import VirtualGrid from "./components/VirtualGrid.vue";
import VirtualList from "./components/VirtualList.vue";

declare module "@vue/runtime-core" {
	export interface ComponentCustomProperties {
		$vx: VxLib,
	}
	export interface GlobalComponents {
		"vx-app": typeof VxApp,

		"vx-accordeon": typeof Accordeon,
		"vx-bar": typeof Bar,
		"vx-button": typeof Button,
		"vx-column": typeof Column,
		"vx-container": typeof Container,
		"vx-dialog": typeof Dialog,
		"vx-drawer": typeof Drawer,
		"vx-dropdown": typeof Dropdown,
		"vx-float": typeof Float,
		"vx-icon": typeof Icon,
		"vx-image": typeof Image,
		"vx-input": typeof Input,
		"vx-modal": typeof Modal,
		"vx-row": typeof Row,
		"vx-spacer": typeof Spacer,
		"vx-text": typeof Text,
		"vx-timeline": typeof Timeline,
		"vx-toast": typeof Toast,
		"vx-tooltip": typeof Tooltip,
		"vx-virtual-grid": typeof VirtualGrid,
		"vx-virtual-list": typeof VirtualList,
	}
}