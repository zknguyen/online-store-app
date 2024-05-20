import uniqid from 'uniqid';

const collectionsData = [
    {
        id: uniqid(),
        name: 'F/W Collection',
        imageURL: '/home/collections/fw-cover.avif',
        collectionURL: '/products',
    },
    {
        id: uniqid(),
        name: 'S/S Collection',
        imageURL: '/home/collections/ss-cover.avif',
        collectionURL: '/products',
    },
    {
        id: uniqid(),
        name: 'User of the Month Collection',
        imageURL: '/home/collections/user-otm-cover.jpeg',
        collectionURL: '/products',
    },
    {
        id: uniqid(),
        name: 'Editor\'s Picks',
        imageURL: '/home/collections/editors-picks-cover.jpeg',
        collectionURL: '/products',
    },
    {
        id: uniqid(),
        name: 'Sneakers',
        imageURL: '/products/nike-af1.webp',
        collectionURL: '/products',
    },
    {
        id: uniqid(),
        name: 'Jackets',
        imageURL: '/products/tnf-nupste.webp',
        collectionURL: '/products',
    },
]

export default collectionsData