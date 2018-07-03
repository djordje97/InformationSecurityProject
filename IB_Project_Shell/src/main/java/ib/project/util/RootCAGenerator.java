package ib.project.util;

import java.util.Date;

import java.security.KeyPair;
import java.security.cert.X509Certificate;
import java.text.ParseException;
import java.text.SimpleDateFormat;

import org.bouncycastle.asn1.x500.X500NameBuilder;
import org.bouncycastle.asn1.x500.style.BCStyle;

public class RootCAGenerator {

	public static void generateCA() throws ParseException {
		// datum
		Date startDate = new SimpleDateFormat("yyyy-MM-dd").parse("2018-07-01");
		Date endDate = new SimpleDateFormat("yyyy-MM-dd").parse("2019-07-01");

		CertificateGenerator gen = new CertificateGenerator();

		// generisanje para kljuceva (priv i pub)
		KeyPair keyPair = gen.generateKeyPair();

		// podaci o vlasniku certifikata
		X500NameBuilder builder = new X500NameBuilder(BCStyle.INSTANCE);

		builder.addRDN(BCStyle.CN, "Djordje Stevanovic");
		builder.addRDN(BCStyle.SURNAME, "Stevanovic");
		builder.addRDN(BCStyle.GIVENNAME, "Djordje");
		builder.addRDN(BCStyle.O, "UNS-FTN");
		builder.addRDN(BCStyle.OU, "Katedra za informatiku");
		builder.addRDN(BCStyle.C, "RS");
		builder.addRDN(BCStyle.E, "djordje97.tkd@gmail.com");

		// UID (USER ID) je ID korisnika
		builder.addRDN(BCStyle.UID, "256");

		IssuerData issuerData = new IssuerData(keyPair.getPrivate(), builder.build());
		SubjectData subjectData = new SubjectData(keyPair.getPublic(), builder.build(), "1", startDate, endDate);

		X509Certificate certificate = gen.generateCertificate(issuerData, subjectData);

		char[] password = "rootCA".toCharArray();

		KeyStoreWriter ksw = new KeyStoreWriter();
		ksw.loadKeyStore(null, password);
		ksw.write("CA", keyPair.getPrivate(), password, certificate);
		ksw.saveKeyStore("./data/rootca.jks", password);

		

		System.out.println("RootCA generated!");
	}

}
