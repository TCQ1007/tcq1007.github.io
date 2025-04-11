export function getAppList() {
  return [
    {
      name: "smart-log",
      url: "http://localhost:5174",
      baseroute: "/smart-log",
      routerMode: "native-scope",
    },
    {
      name: "gasp",
      url: "http://localhost:5175",
      baseroute: "/gasp",
    },
  ];
}
