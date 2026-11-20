const multerUploadedFiles = (filesObject) => {
    let filesUploaded = {};
    Object.keys(filesObject).forEach((key) => {
        filesUploaded[key] = filesObject[key][0];
    });

    return filesUploaded;
}

export { multerUploadedFiles };