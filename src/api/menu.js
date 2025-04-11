export function getMenu(tenant) {
    return [
        {
            name: 'HOME',
            path: '/',
            app:'main',
            icon: 'home',
        },
        {
            name: 'Smart Log ',
            path: '/smart-log/',
            app:'smart-log',
            icon: 'appstore',
            subMenu:[
                {
                    name:'Smart Log ',
                    app:'smart-log',
                    path:'/smart-log/',
                    subMenu:[]
                },
                {
                    name:'Smart Log Tools',
                    app:'smart-log',
                    path:'/smart-log/tool',
                },
                {
                    name:'Smart Log S3 Upload',
                    app:'smart-log',
                    path:'/smart-log/s3',
                }
            ]
        }
    ]
}

export function buildPathToAppMap(customMenu) {
    const pathToAppMap = {};
    // 定义递归函数
    function traverse(menuItem) {
        // 传入的菜单项如果是数组，那就遍历每一个子项
        if(Array.isArray(menuItem)){
            console.log("Traversing array of menu items:", menuItem);
            menuItem.forEach(item=>{
                traverse(item)
            })
            return;
        }
    
        // 如果是一个对象，那么若存在 path 和 app，记录映射
        if (menuItem && menuItem.path && menuItem.app) {
            console.log(`Adding mapping: ${menuItem.path} -> ${menuItem.app}`);
            pathToAppMap[menuItem.path] = menuItem.app;
        } else if (menuItem) {
            console.log("Menu item missing path or app:", menuItem);
        }

        // 如果存在子菜单，递归处理
        if (menuItem && Array.isArray(menuItem.subMenu)) {
            console.log(`Processing submenu for ${menuItem.name || 'unnamed menu'}`);
            menuItem.subMenu.forEach(traverse);
        }
    }

    // 使用传入的菜单或者默认获取菜单
    const menuToUse = customMenu || getMenu();
    console.log("Building path map with menu:", menuToUse);
    
    // 开始递归遍历
    traverse(menuToUse);
    console.log('Final pathToAppMap:', JSON.stringify(pathToAppMap));
    return pathToAppMap;
}
