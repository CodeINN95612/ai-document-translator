import { BlobServiceClient, ContainerClient } from "@azure/storage-blob";

export class BlobClient {
  blobServiceClient: BlobServiceClient;
  containerClient: ContainerClient;

  constructor(storageAccount: string, containerName: string, sasToken: string) {
    this.blobServiceClient = new BlobServiceClient(
      `https://${storageAccount}.blob.core.windows.net/?${sasToken}`
    );
    this.containerClient =
      this.blobServiceClient.getContainerClient(containerName);
  }

  async deleteBlob(blobName: string) {
    const blobClient = this.containerClient.getBlockBlobClient(blobName);
    await blobClient.delete();
  }

  async getBlob(blobName: string) {
    const blobClient = this.containerClient.getBlockBlobClient(blobName);
    const downloadBlockBlobResponse = await blobClient.download(0);
    const blob = await downloadBlockBlobResponse.blobBody;
    return blob;
  }

  async uploadBlob(blobName: string, blob: Blob) {
    const blobClient = this.containerClient.getBlockBlobClient(blobName);
    await blobClient.uploadData(blob);
  }
}

export const sourceBlobClient = new BlobClient(
  import.meta.env.VITE_AZURE_STORAGE_ACCOUNT,
  import.meta.env.VITE_AZURE_STORAGE_SOURCE_CONTAINER,
  import.meta.env.VITE_AZURE_STORAGE_SOURCE_SAS
);
export const sourceBlobClientUrl = `https://blobstoragetranslate.blob.core.windows.net/${
  import.meta.env.VITE_AZURE_STORAGE_SOURCE_CONTAINER
}?${import.meta.env.VITE_AZURE_STORAGE_SOURCE_SAS}`;

export const targetBlobClient = new BlobClient(
  import.meta.env.VITE_AZURE_STORAGE_ACCOUNT,
  import.meta.env.VITE_AZURE_STORAGE_TARGET_CONTAINER,
  import.meta.env.VITE_AZURE_STORAGE_TARGET_SAS
);
export const targetBlobClientUrl = `https://blobstoragetranslate.blob.core.windows.net/${
  import.meta.env.VITE_AZURE_STORAGE_TARGET_CONTAINER
}?${import.meta.env.VITE_AZURE_STORAGE_TARGET_SAS}`;
