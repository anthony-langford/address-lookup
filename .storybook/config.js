import { configure } from '@storybook/react';
import 'antd/dist/antd.css';
// Import all files ending in *.stories.tsx
configure(require.context('../src', true, /\.stories\.tsx?$/), module);
