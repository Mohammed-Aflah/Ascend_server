export class User {
  constructor(
    public readonly firstname: string,
    public readonly lastname: string,
    public readonly email: string,
    public readonly password: string,
    public readonly role: "user" | "admin" | "company",
    public readonly profilePic?: string,
    public readonly _id?: string,
    public readonly phonenumber?: string,
    public readonly blockStatus?: boolean,
    public readonly status?: boolean,
    public readonly resumelink?: string,
    public readonly skills?: string[],
    public readonly experinces?: string[],
    public readonly personalsite?: string,
    public readonly sociallinks?: string[]
  ) {}
}
