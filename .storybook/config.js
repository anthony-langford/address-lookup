import { configure } from '@storybook/react';
import 'antd/dist/antd.css';
import '../src/styles/index.scss';

configure(require.context('../src', true, /\.stories\.js$/), module);
