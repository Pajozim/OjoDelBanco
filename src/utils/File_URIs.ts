import { Asset } from 'expo-asset';
import { File, Paths } from 'expo-file-system';
import * as FileSystemLegacy from 'expo-file-system/legacy'; // Still needed for asset URIs

export default async function getDictionaryUri(): Promise<string> {
  // 1. Get the asset reference
  const asset = Asset.fromModule(require('../assets/models/character_dict.json'));
  
  // 2. Download the asset to the device's cache directory if not already there
  //    Asset.downloadAsync() ensures the file is physically present on the file system
  await asset.downloadAsync();
  
  // 3. Get the local URI of the downloaded asset
  //    This usually returns a 'file://' URI or a 'data:' URI, but in production
  //    Android builds, it might be an inaccessible 'asset://' URI.
  const assetUri: string | null = asset.localUri;
  if (!assetUri) {
    throw new Error('Failed to get the local URI of the downloaded asset'); 
  }
  
  // 4. Define the target path in the app's writable cache directory using the new 'Paths' API
  const targetFile = new File(Paths.cache, 'character_dict.json');
  
  // 5. Check if the file already exists at the target location using the modern 'exists' property
  if (!targetFile.exists) {
    // 6. If not, copy it using the modern 'copy' method.
    //    Note: The 'copy' method expects a 'File' or 'Directory' instance.
    //    To copy from an asset URI, we still need the legacy 'copyAsync' because
    //    the modern 'File' constructor cannot directly read the raw 'asset://' URI.
    await FileSystemLegacy.copyAsync({
      from: assetUri,
      to: targetFile.uri
    });
  }
  
  // 7. Return the modern File object's URI (which is a standard 'file://' path)
  return targetFile.uri;
}