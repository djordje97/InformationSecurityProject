package ib.project.entity;

public class UserDto {
	
	private String email;
	private String password;
	private boolean active;
	 
	public UserDto() {
		
	}
	
	
	public UserDto(String email, String password, boolean active) {
		super();
		this.email = email;
		this.password = password;
		this.active = active;
	}


	public UserDto(User user) {
		this(user.getEmail(),user.getPassword(),user.isActive());
	}


	public String getEmail() {
		return email;
	}


	public void setEmail(String email) {
		this.email = email;
	}


	public String getPassword() {
		return password;
	}


	public void setPassword(String password) {
		this.password = password;
	}


	public boolean isActive() {
		return active;
	}


	public void setActive(boolean active) {
		this.active = active;
	}
	
	
}
