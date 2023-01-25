import { CapacitorConfig } from '@capacitor/cli';
import { Plugins } from '@capacitor/core';

const config: CapacitorConfig = {
  plugins: {
    CapacitorHttp: {
      enabled: true,
    },
  },
  appId: 'com.example.app',
  appName: 'routerman',
  webDir: 'www',
  bundledWebRuntime: false
};

export default config;
