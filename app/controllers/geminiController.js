const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

const chimebuka = `Anyanwu Chimebuka Emmanuel
Software developer 

Contact Information:
Phone: +234 806 933 1070  
Email: chimebukaayanwu@gmail.com  
portfolio site (AI-based): https://chat-ebukai.onrender.com
LinkedIn: http://www.linkedin.com/in/chimebuka-anyanwu
GitHub: https://github.com/chimebukanian
Lagos, Nigeria

Professional Summary
Driven Full Stack Software Engineer skilled in building scalable and secure software applications. Proficient in various stacks, including Node.js/Express, FastApi, Django/Django REST Framework, Java Spring Boot, and C# .Net, TypeScript, React, etc. Experienced with the AWS platform and application security as a Google-certified cybersecurity professional. Adept at delivering reliable software solutions, and ensuring maintainability and performance.

Technical Skills
Programming Languages: Python, JavaScript, TypeScript, C, C#, C++, Java
Frameworks: Django, ASP.Net Framework, Node.js, FastApi, React, Java Spring Boot.
Tools & Platforms: AWS, Linux, Docker, Git.
Other Expertise: Cloud Computing, Technical Writing, CyberSecurity, Soft Skills

Professional Experience
Independent national electoral commission (INEC), Jos, plateau, Nigeria.
ICT staff
08/2024 to 12/2024
the ict department provides all IT services for the organization.
Contract Backend Developer  
Remote – 02/2022 to 04/2023  
contracted as a backend developer by a team in a hackathon to build a telemedicine software for virtual medical consultations for individuals with less access to medical care in remote areas, ultimately to provide access to medical services and improve lives. I wrote the APIs for the web app's backend. Basically collaborated with the remote team to secure the subregional win in the 3MTT hackathon.
ALX Africa  (training)
Remote – 02/2022 to 04/2023  
Gained hands-on experience in low-level programming with C, high-level programming with Python, Flask, and JavaScript.
Enhanced DevOps and Linux system engineering skills while contributing to collaborative projects.


Zuri/Ingressive for Good (Backend Developer Intern)  
Remote – 05/2022 to 07/2022 
Developed backend solutions for Django- and Node.js-based projects.
Improved coding efficiency and problem-solving through collaborative sprints.




Education
Bachelor of Science in Biochemistry
University of Ibadan (college of medicine)– 01/2019 to 05/2024
Diploma in Software Engineering  
ALX Africa (Holberton School) – 02/2022 to 04/2023



Certifications
Google Cybersecurity certificate:
https://www.credly.com/badges/903a3db5-8ffc-48da-965f-03d0cec39a78/public_url
Soft skills certification: https://drive.google.com/file/d/1fllrroKxnHjDrG1VpuaitehdJpjCqQdM/view?usp=drivesdk 
Software engineering: https://drive.google.com/file/d/1ZRzhQmBOUhsIw2Zx2V1q0MegwL7RLdrF/view?usp=drivesdk
https://drive.google.com/file/d/1ZeASKYju7tonGokJF1499HkwBHjozsdr/view?usp=drivesdk
Organizations & Fellowship
- Member, Google Developer Student Club, University of Ibadan
- Fellow, The Room Fellowship

Anyanwu Chimebuka Emmanuel
Cybersecurity Analyst | Security Engineer 
📞 +234 806 933 1070 | ✉️ chimebukaayanwu@gmail.com  
🌍 Portfolio | LinkedIn | Github
PROFESSIONAL SUMMARY
Dedicated Cybersecurity Analyst with a strong background in network security, risk assessment, vulnerability management, and SIEM tools. Google Cybersecurity Certified, with hands-on experience in threat analysis, security auditing, and compliance frameworks (NIST, ISO 27001). Proven ability to detect, prevent, and mitigate cyber threats while ensuring business continuity. Passionate about securing digital assets and implementing industry-leading security policies.  
CORE SKILLS
✅ Threat Detection & Incident Response (SIEM, IDS/IPS)  
✅ Risk Assessment & Mitigation (NIST, ISO 27001, GDPR, PCI DSS, HIPAA)  
✅ Network & Application Security (Firewalls, VPN, Secure Coding practices)  
✅ Vulnerability Assessment & Penetration Testing
✅ Authentication & Identity Access Management (IAM)
✅ Security Information and Event Management (SIEM)
✅ Programming & Automation (Python, SQL, Bash, Linux)  
✅ Security Compliance & Governance  
PROFESSIONAL EXPERIENCE  
Contract Backend Developer (Application security
3MTT Hackathon (2022 – 2023)  
Collaborated with a remote team to secure the subregional win of the 3MTT hackathon, where i developed secure APIs for the backend of the telemedicine web app using Django REST Framework, ensuring data protection and access control.
Implemented authentication security (OAuth, JWT) and mitigated vulnerabilities (SQL injection, XSS, broken authentication).Also, I ensure compliance with healthcare data security standards.
ICT Staff 
Independent National Electoral Commission (INEC), Jos, Nigeria
Providedtechnical support as regards IT for the organization, ensuring smooth and secure running of it's IT systems 
EDUCATION & CERTIFICATIONS
🎓 B.Sc. Biochemistry – **University of Ibadan (2019 – 2024)
🎓 Diploma in Software Engineering – ALX Africa (Holberton School) (2022 – 2023) 
Certifications:
🏆 Google Cybersecurity Certificate – Coursera, ACE-Endorsed 🔗Credly Badge  
🏆 Python Programming Certification – Cisco Networking Academy  
🏆 Soft Skills Certification – Jobberman Nigeria.
PROJECTS & TECHNICAL EXPOSURE
🔹 Security Automation with Python –writing custom security scripts for log analysis file manipulation and incident detection.  
🔹 Intrusion Detection/Prevention Systems (IDS)** – Hands-on experience deploying and configuring IPS like Suricata.  
🔹 Penetration Testing – Conducted vulnerability assessments using Nmap, Metasploit, brute force tools.
🔹 Risk Management – Assisted organizations in identifying and mitigating cyber risks using NIST and ISO frameworks.
TOOLS & TECHNOLOGIES
🔹 SIEM Tools: Splunk, Google chronicle
🔹Packet Sniffers/Network Analysis: Tcpdump, Wireshark
🔹 Penetration Testing: Kali Linux, Metasploit, Nmap  
🔹 Programming & Scripting: Python, SQL, Bash  
🔹 Network and Application Security  
🔹Documentation: playbooks, OWASP 10, policies, standards, procedures,etc.
🔹Operating Systems:Linux (Ubuntu, Kali), Windows. 


ADDITIONAL INFORMATION
🔹 Languages: English (Fluent)  
🔹 Soft Skills: Leadership, Analytical Thinking, Communication  

`
exports.chatbotController = async (req, res) => {
  try {
    const { text, history } = req.body;


      const prompt = `You are EbukAI, an AI powered web app built by chimebuka, and secondarily, serves as his portfolio website to highilight his professional qualifications and skills. To create a concise but encompassing elevator pitch about him, here are his different resumes: ${chimebuka}. when asked give all details with links (even if the question was about you)

Meanwhile, you primarily are to answer users communicating with you.
A user is currently conversing with you, Here is the history of a conversation between you and the user so far: ${history}, which you might need to make reference to in subsequent prompts. answer the user's next prompt.
     ${text}
      
    `;

  
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const reply = response.text();

    return res.status(200).json({ reply });
  } catch (err) {
    console.error(err.message);
    const statusCode = err.status || err.statusCode || 500;
    return res.status(statusCode).json({
	//  error: err.message,
	error: "somethin went wrong"
    });
  }
};
