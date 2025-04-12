# rnstyles

`rnstyles` is a lightweight, utility-first, responsive styling library for **React Native**, **React**, **Next.js**, **Expo**, and **Electron**. It mimics the functionality of **Tailwind CSS** and allows you to use utility classes for styling, including full class names, shorthand (Tailwind-style), responsive styles, custom fonts, and dark/light modes.

---

## Features

- Utility-first styling similar to **Tailwind CSS**.
- Support for responsive styles across different screen sizes.
- Custom fonts support.
- Dark and light mode support.
- Compatible with **React Native**, **React**, **Next.js**, **Expo**, and **Electron**.

---

## Installation

To install `rnstyles`, you can use **npm** or **yarn**.

### Using npm:

```bash
npm install rnstyles
```

#### Usage:

### **What's Added:**

1. **React Native Example**: A sample React Native component using `rnstyles` to apply utility classes (`applyStyles` and `tw`).

   ```javascript
   import React from "react";
   import { View, Text } from "react-native";
   import { applyStyles } from "rnstyles";

   const MyComponent = () => {
     return (
       <View style={applyStyles("bg-blue-500 p-4")}>
         <Text style={applyStyles("text-white font-serif")}>
           Hello, React Native World!
         </Text>
       </View>
     );
   };
   ```

2. **React Example**:

   ```javascript
   import { tw } from "rnstyles";

   const MyComponent = () => {
     return (
       <div className={tw("bg-blue-500 text-white p-4 rounded-md")}>
         Hello, World!
       </div>
     );
   };
   ```
