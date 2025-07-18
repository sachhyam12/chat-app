import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, files, cb) {
        cb(null, './public/temp')
    },
    filename: function (req, files, cb) {
        cb(null, files.originalname)
    }
})

const upload = multer({
    storage
});

export const uploadUserFiles = upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 }
]);
