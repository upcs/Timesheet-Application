// https://betterprogramming.pub/4-ways-of-adding-external-js-files-in-reactjs-823f85de3668
export const appendScript = (scriptToAppend, func) => {
    const script = document.createElement("script");
    script.src = scriptToAppend;
    script.async = true;
    let firebase;
    document.body.appendChild(script);
    script.onload = function() {
        console.log(`${scriptToAppend} has loaded`);
        
        func();
        console.log("Firebase?", firebase);
    };
}