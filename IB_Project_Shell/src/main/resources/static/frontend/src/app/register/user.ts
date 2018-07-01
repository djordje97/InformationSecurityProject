export class User{
    private email;
    private password;

    
    public get emailU() : string {
        return this.email
    }

    
    public set emailU(v : string) {
        this.email = v;
    }
    
    
    public get passwordU() : string {
        return this.password
    }

    
    public set passwordU(v : string) {
        this.password= v;
    }
    
    
    
}