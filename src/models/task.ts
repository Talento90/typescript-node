export default class Task {
	
	public Id: number;
	public Name: string;
	public Description: string;
    public Completed: boolean;
    	
	constructor(id: number, name: string, description: string) {
		this.Id = id;
		this.Name = name;
		this.Description = description;
        this.Completed = false;
	}
}

