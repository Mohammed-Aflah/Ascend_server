export class Company{
    constructor(
        public readonly email:string,
        public readonly name:string,
        public readonly password:string,
        public readonly description?:string,
        public readonly contatct?:string,
        public readonly officeLocations?:{name:string,icon:string}[],
        public readonly joinDate?:Date,
        public readonly industry?:string,
        public readonly images?:string[],
        public readonly benefits?:{icon:string,headline:string,description:string}[],
        public readonly foundedDate?:Date,
        public readonly teams?:{name:string,profile:string,designation:string}[],
        public readonly techStack?:{name:string,icon:string}[],
        public readonly website?:string,
        public readonly coverImage?:string
    ){}
}