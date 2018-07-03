package ib.project.rest;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ResourceBundle;

import javax.servlet.ServletContext;
import javax.websocket.server.PathParam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import ib.project.entity.User;
import ib.project.service.UserServiceInterface;

@RestController
@RequestMapping(value = "/api/demo", produces = MediaType.APPLICATION_JSON_VALUE)
public class DemoController {

	private static String DATA_DIR_PATH;

	@Autowired
	ServletContext context;
	
	@Autowired
	UserServiceInterface userService;

	static {
		ResourceBundle rb = ResourceBundle.getBundle("application");
		DATA_DIR_PATH = rb.getString("dataDir");
	}

	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<String> createAFileInResources() throws IOException {

		byte[] content = "Content".getBytes();
		
		String directoryPath = getResourceFilePath(DATA_DIR_PATH).getAbsolutePath();
 		
		Path path = Paths.get(directoryPath + File.separator + "demo.txt");

		Files.write(path, content);
		return new ResponseEntity<String>(path.toString(), HttpStatus.OK);
	}

	@RequestMapping(value = "/download/jks", method = RequestMethod.POST)
	public ResponseEntity<byte[]> download(@RequestBody String email) {
		System.out.println("USao u download");
		System.out.println(email);
		User user=userService.findByEmail(email);
		File file = new File("C:\\Users\\Djole\\InformationSecurityProject\\IB_Project_Shell\\data\\"+user.getEmail()+".jks");
		System.out.println(file.getName());
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		headers.add("filename",user.getEmail()+".jks");
		byte[] bFile = readBytesFromFile(file.toString());

		return ResponseEntity.ok().headers(headers).body(bFile);
	}

	private static byte[] readBytesFromFile(String filePath) {

		FileInputStream fileInputStream = null;
		byte[] bytesArray = null;
		try {

			File file = new File(filePath);
			bytesArray = new byte[(int) file.length()];

			// read file into bytes[]
			fileInputStream = new FileInputStream(file);
			fileInputStream.read(bytesArray);

		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (fileInputStream != null) {
				try {
					fileInputStream.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}

		}

		return bytesArray;

	}

	public File getResourceFilePath(String path) {
		
		URL url = this.getClass().getClassLoader().getResource(path);
		File file = null;

		try {
			
			file = new File(url.toURI());
		} catch (Exception e) {
			file = new File(url.getPath());
		}

		return file;
	}
	
	@PostMapping("/upload")
	public ResponseEntity<Void> handleFileUpload(@RequestParam("file") MultipartFile file,@RequestParam("email")String email) {
		try {
			System.out.println(file.getOriginalFilename());
			Path pathFile=Paths.get("C:\\Users\\Djole\\InformationSecurityProject\\IB_Project_Shell\\data\\"+file.getOriginalFilename());
			System.out.println(pathFile);
			Files.copy(file.getInputStream(), pathFile);
			User user=userService.findByEmail(email);
			user.setCertificate(file.getOriginalFilename());
			user=userService.save(user);
			System.out.println(user.getCertificate());
			
			
		} catch (Exception e) {

		}
		return new ResponseEntity<Void>(HttpStatus.OK);
	}
}
