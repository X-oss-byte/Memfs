import { IFileSystemDirectoryHandle } from '../fsa/types';
import { FsaToNodeConstants } from './constants';
import type { FsLocation } from './types';

export const pathToLocation = (path: string): FsLocation => {
  if (path[0] === FsaToNodeConstants.Separator) path = path.slice(1);
  if (path[path.length - 1] === FsaToNodeConstants.Separator) path = path.slice(0, -1);
  const lastSlashIndex = path.lastIndexOf(FsaToNodeConstants.Separator);
  if (lastSlashIndex === -1) return [[], path];
  const file = path.slice(lastSlashIndex + 1);
  const folder = path.slice(0, lastSlashIndex).split(FsaToNodeConstants.Separator);
  return [folder, file];
};

export const testDirectoryIsWritable = async (dir: IFileSystemDirectoryHandle): Promise<boolean> => {
  const testFileName = '__memfs_writable_test_file_' + Math.random().toString(36).slice(2) + Date.now();
  try {
    await dir.getFileHandle(testFileName, { create: true });
    return true;
  } catch {
    return false;
  } finally {
    try {
      await dir.removeEntry(testFileName);
    } catch (e) {}
  }
};
