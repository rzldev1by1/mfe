import React, { Component } from 'react';


global.appVersion = process.env.REACT_APP_VERSION;

// version from response - first param, local version second param
const semverGreaterThan = (versionA, versionB) => {
  const versionsA = versionA.split(/\./g);
  const versionsB = versionB.split(/\./g);

  while (versionsA.length || versionsB.length) {
    const a = Number(versionsA.shift());
    const b = Number(versionsB.shift());

    // eslint-disable-next-line no-continue
    if (a === b) continue;
    // eslint-disable-next-line no-restricted-globals
    // return a > b || isNaN(b);
    return a > b  || isNaN(b);
  }
  return false;
};

class VersioningComponent extends Component {
    
    // constructor(props) {
    //     super(props);
     
    // }

    componentDidMount() {
        this.checkVersion();        
        
    }

    checkVersion = () => {
        fetch('/meta.json')
        .then((response) => response.json())
        .then((meta) => {
          const latestVersion = meta.version;
          const currentVersion = global.appVersion;
          console.log(`latest version ${latestVersion}`);
          console.log(`current version ${currentVersion}`);
          const shouldForceRefresh = semverGreaterThan(latestVersion, currentVersion);
          
          if (shouldForceRefresh) {
            console.log(`We have a new version - ${latestVersion}. Should force refresh`);
            console.log('Clearing cache and hard reloading...')
            // if (caches) {
            //   // Service worker cache should be cleared with caches.delete()
            //   caches.keys().then(function(names) {
            //     for (let name of names) caches.delete(name);
            //   });
            // }

            //local storage            
            let storage = {...localStorage};
            console.log(storage);

            let keys = Object.keys(storage);
            if(keys && keys.length){
                keys.forEach((item) => {
                    localStorage.removeItem(item);
                });
            }
            

            // delete browser cache and hard reload
            window.location.reload(true);

          } else {
            console.log(`You already have the latest version - ${latestVersion}. No cache refresh needed.`);

          }
        });
    }



    

    render() {
        return (
            <div>
                  
            </div>
        );
    }
}

export default VersioningComponent;
