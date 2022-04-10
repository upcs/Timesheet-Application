/**
 * Used to remove location services
 * 
 * Source: https://chafikgharbi.com/expo-android-manifest/
 * 
 * @author gabes
 */

const { withAndroidManifest } = require("@expo/config-plugins")

module.exports = function androiManifestPlugin(config) {
  return withAndroidManifest(config, async config => {
    let androidManifest = config.modResults.manifest

    // add the tools to apply permission remove
    androidManifest.$ = {
      ...androidManifest.$,
      "xmlns:tools": "http://schemas.android.com/tools",
    }

    // add remove property to the audio record permission
    androidManifest["uses-permission"] = androidManifest["uses-permission"].map(
      perm => {
        if (perm.$["android:name"] === "android.permission.ACCESS_BACKGROUND_LOCATION") {
          perm.$["tools:node"] = "remove"
        }
        if (perm.$["android:name"] === "android.permission.ACCESS_COARSE_LOCATION") {
            perm.$["tools:node"] = "remove"
          }
          if (perm.$["android:name"] === "android.permission.ACCESS_FINE_LOCATION") {
            perm.$["tools:node"] = "remove"
          }
          
        return perm
      }
    )

    return config
  })
}