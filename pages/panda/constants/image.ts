interface ImagePaths {
    readonly id: number;
    readonly petId: number;
    readonly path: string;
    readonly detailsImgPath: string;
    readonly liveCamImage: string;
    readonly liveCamImages: string[];
}

export const petImagePaths: ImagePaths[] = [
    {
        id: 0,
        petId: 0,
        path: '../../assets/images/panda-page/panda-icons/Eagle.svg',
        detailsImgPath: '../../assets/images/eagles-page/eagle-image/image 163.png',
        liveCamImage: '../../assets/images/eagles-page/eagle-image/Youtubeplayer.png',
        liveCamImages: [
            '../../assets/images/eagles-page/eagle-image/1.png',
            '../../assets/images/eagles-page/eagle-image/2.png',
            '../../assets/images/eagles-page/eagle-image/3.png',
        ],
    },
    {
        id: 1,
        petId: 1,
        path: '../../assets/images/panda-page/panda-icons/Panda.svg',
        detailsImgPath: '../../assets/images/panda-page/panda-image/image 163.png',
        liveCamImage: '../../assets/images/panda-page/panda-image/panda-youtube-img.png',
        liveCamImages: [
            '../../assets/images/panda-page/panda-image/1.png',
            '../../assets/images/panda-page/panda-image/2.png',
            '../../assets/images/panda-page/panda-image/3.png',
        ],
    },
    {
        id: 2,
        petId: 2,
        path: '../../assets/images/panda-page/panda-icons/Eagle.svg',
        detailsImgPath: '../../assets/images/eagles-page/eagle-image/image 163.png',
        liveCamImage: '../../assets/images/eagles-page/eagle-image/Youtubeplayer.png',
        liveCamImages: [
            '../../assets/images/eagles-page/eagle-image/1.png',
            '../../assets/images/eagles-page/eagle-image/2.png',
            '../../assets/images/eagles-page/eagle-image/3.png',
        ],
    },
    {
        id: 3,
        petId: 3,
        path: '../../assets/images/panda-page/panda-icons/Gorilla.svg',
        detailsImgPath: '../../assets/images/gorillas-page/image 163.png',
        liveCamImage: '../../assets/images/gorillas-page/Youtubeplayer.png',
        liveCamImages: [
            '../../assets/images/gorillas-page/1.png',
            '../../assets/images/gorillas-page/2.png',
            '../../assets/images/gorillas-page/3.png',
        ],
    },
    {
        id: 4,
        petId: 4,
        path: '../../assets/images/panda-page/panda-icons/Lemur.svg',
        detailsImgPath: '../../assets/images/lemur-page/image 163.png',
        liveCamImage: '../../assets/images/lemur-page/Youtubeplayer.png',
        liveCamImages: [
            '../../assets/images/lemur-page/1.png',
            '../../assets/images/lemur-page/2.png',
            '../../assets/images/lemur-page/3.png',
        ],
    },
];
