
export interface SystemInfo{
    'board-name': string;
    'serial-number': string;
    'upgrade-firmware': string;
}
export interface LANInfo{
    'address': string;
}
export interface WANInfo{
    'address': string;
    'gateway': string;
    'primary-dns': string;
    'secondary-dns': string;
}
export interface WiFiInfo{
    'ssid': string;
    'channel-width': string;
    'band': string;
    'disabled': boolean;
    'frequency': number;
    'hide-ssid': boolean;
    'county': string;
}