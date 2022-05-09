
# VX-VUE

**VX-VUE** is a simple, non-instrusive, totally customizable Component Library for Vue 3. 
It requires *typescript* and *vue-class-component*.


Installation:
```bash
npm i https://github.com/victormga/vx-vue
```
In your main:
```typescript
import { createApp } from  "vue";
import App from "./App.vue";
import Vx from "@victormga/vx-vue";

createApp(App).use(Vx).mount("#app");
```


## Basic usage
Wrap your (piece of) app in a *vx-app* tag:

```xml
<template>
	<vx-app>
		<div class="my-code">
			...
		</div>
	</vx-app>
</template>
```

## Components
_
**App**
The main container.
```xml
<vx-app>
	<slot />
</vx-app>
```
```typescript
props: {
	theme: { type:  String, required:  false, default:  "primary md" },
},
```
_
**Accordeon**
Simple animated accordeon.
```xml
<vx-accordeon>
	<slot #button />
	<slot />
</vx-accordeon>
```
```typescript
props: {
	theme: { type:  String, required:  false },
	// whether accordeon is open or not.
	open: { type:  Boolean, required:  false },
},
```
_
**Bar**
Top/bottom bar. Automatically scales to fill the entire container.
```xml
<vx-bar>
	<slot #bar-content/>
	<slot />
</vx-bar>
```
```typescript
props: {
	theme: { type: String, required: false },
	// size (height) of the bar. Accepts string, number, px, %.
	size: { type: String, required: false, default: "50" },
	// accepts: "top", "bottom"
	position: { type: String, required: false, default: "top" },
},
```
_
**Button**
A simple button component. Can have loading and icon (check **icon** session for more details). 
*@click-async* triggers the loading state in the button until the callback is resolved.
```xml
<vx-button>
	<slot>
</vx-button>
```
```typescript
props: {
	theme: { type:  String, required:  false },
	// accepts icon name/string (eg: "user", "save"). Defaults to iconLeft;
	icon: { type:  String, required:  false },
	// accepts icon name/string (eg: "user", "save").
	iconLeft: { type:  String, required:  false },
	// accepts icon name/string (eg: "user", "save").
	iconRight: { type:  String, required:  false },
	// height of the button. Centralizes text vertically.
	height: { type:  String, required:  false },
	// Whether the button is disabled or not.
	disabled: { type:  Boolean, required:  false, default:  false },
	// Whether the button is loading or not.
	loading: { type:  Boolean, required:  false },
},
emits: ["click", "click-async"],
```
_
**App**
The main container.
```xml
<vx-app>
	<slot />
</vx-app>
```
```typescript
props: {
	theme: { type:  String, required:  false, default:  "primary md" },
},
```
_
**App**
The main container.
```xml
<vx-app>
	<slot />
</vx-app>
```
```typescript
props: {
	theme: { type:  String, required:  false, default:  "primary md" },
},
```
_
**App**
The main container.
```xml
<vx-app>
	<slot />
</vx-app>
```
```typescript
props: {
	theme: { type:  String, required:  false, default:  "primary md" },
},
```
_
**App**
The main container.
```xml
<vx-app>
	<slot />
</vx-app>
```
```typescript
props: {
	theme: { type:  String, required:  false, default:  "primary md" },
},
```
_
**App**
The main container.
```xml
<vx-app>
	<slot />
</vx-app>
```
```typescript
props: {
	theme: { type:  String, required:  false, default:  "primary md" },
},
```
_
**App**
The main container.
```xml
<vx-app>
	<slot />
</vx-app>
```
```typescript
props: {
	theme: { type:  String, required:  false, default:  "primary md" },
},
```
_
**App**
The main container.
```xml
<vx-app>
	<slot />
</vx-app>
```
```typescript
props: {
	theme: { type:  String, required:  false, default:  "primary md" },
},
```
_
**App**
The main container.
```xml
<vx-app>
	<slot />
</vx-app>
```
```typescript
props: {
	theme: { type:  String, required:  false, default:  "primary md" },
},
```
_
**App**
The main container.
```xml
<vx-app>
	<slot />
</vx-app>
```
```typescript
props: {
	theme: { type:  String, required:  false, default:  "primary md" },
},
```
_
**App**
The main container.
```xml
<vx-app>
	<slot />
</vx-app>
```
```typescript
props: {
	theme: { type:  String, required:  false, default:  "primary md" },
},
```
_
**App**
The main container.
```xml
<vx-app>
	<slot />
</vx-app>
```
```typescript
props: {
	theme: { type:  String, required:  false, default:  "primary md" },
},
```
_
**App**
The main container.
```xml
<vx-app>
	<slot />
</vx-app>
```
```typescript
props: {
	theme: { type:  String, required:  false, default:  "primary md" },
},
```
_
**App**
The main container.
```xml
<vx-app>
	<slot />
</vx-app>
```
```typescript
props: {
	theme: { type:  String, required:  false, default:  "primary md" },
},
```
_
**App**
The main container.
```xml
<vx-app>
	<slot />
</vx-app>
```
```typescript
props: {
	theme: { type:  String, required:  false, default:  "primary md" },
},
```
_
**App**
The main container.
```xml
<vx-app>
	<slot />
</vx-app>
```
```typescript
props: {
	theme: { type:  String, required:  false, default:  "primary md" },
},
```
_
**App**
The main container.
```xml
<vx-app>
	<slot />
</vx-app>
```
```typescript
props: {
	theme: { type:  String, required:  false, default:  "primary md" },
},
```
_
**App**
The main container.
```xml
<vx-app>
	<slot />
</vx-app>
```
```typescript
props: {
	theme: { type:  String, required:  false, default:  "primary md" },
},
```
_
**App**
The main container.
```xml
<vx-app>
	<slot />
</vx-app>
```
```typescript
props: {
	theme: { type:  String, required:  false, default:  "primary md" },
},
```
_
**App**
The main container.
```xml
<vx-app>
	<slot />
</vx-app>
```
```typescript
props: {
	theme: { type:  String, required:  false, default:  "primary md" },
},
```

## Contributing
Contributions are welcome. If you find some   problem, wish to create more validations, or wish to improve the library in any way, feel free to create a issue or a pull request.


## License

ISC License (ISC)

  

Copyright 2021 - Victor Hugo Sabiar

  

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

  

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.