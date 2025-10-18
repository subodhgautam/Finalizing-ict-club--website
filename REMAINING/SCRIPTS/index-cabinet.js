 // Team members data stored in a JavaScript array
        const teamMembers = [
            {
                name: "Pratish Subedi",
                role: "President",
                description: "Pratish leads our club with 5+ years of tech leadership experience. Specializes in AI and cloud computing.",
                img: "pratish.jpg",
                github: "#",
                twitter: "#",
                linkedin: "#",
                // portfolio: "#"  // Optional, can leave empty or null if not available
                portfolio: "https://www.pratish09.com.np/"  // Optional, can leave empty or null if not available
            },
            {
                name: "Sohan Ghimire",
                role: "Vice President",
                description: "Sohan manages club operations and has expertise in cybersecurity and network infrastructure.",
                img: "sohan.jpg",
                github: "#",
                twitter: "#",
                linkedin: "#",
                portfolio: "#"  // Optional
            },
            {
                name: "Pujan Pandey",
                role: "Tech Lead",
                description: "Pujan oversees all technical projects with expertise in full-stack development and DevOps.",
                img: "pujan.jpg",
                github: "#",
                twitter: "#",
                linkedin: "#",
                portfolio: "https://github.com/PujanCoder/Pujan__Pandey"  // Optional
            },
            {
                name: "Rijan Dhakal",
                role: "Treasurer",
                description: "Rijan handles the finances for the club and is an expert in budgeting and financial planning.",
                img: "rijan.jpg",
                github: "#",
                twitter: "#",
                linkedin: "#",
                portfolio: "https://kodeflame.tech/"  // Optional
            }
        ];

        // Populate the team members dynamically
        const teamContainer = document.getElementById('team-members-container');
        teamMembers.forEach(member => {
            const memberDiv = document.createElement('div');
            memberDiv.classList.add('team-member');
            memberDiv.setAttribute('aria-label', `${member.name}, ${member.role}`);
            memberDiv.setAttribute('title', `${member.name}, ${member.role}`);

            // If portfolio exists, wrap the entire card in a link
            if (member.portfolio) {
                memberDiv.innerHTML = `
                    <a href="${member.portfolio}" target="_blank" rel="noopener noreferrer" style="text-decoration: none;">
                        <div class="image-wrapper">
                            <img src="${member.img}" alt="${member.name}" class="team-member-img" />
                        </div>
                        <h3>${member.name}</h3>
                        <p class="role">${member.role}</p>
                        <div class="social-links">
                            <a href="${member.github}" aria-label="GitHub profile of ${member.name}" title="GitHub"><i class="fab fa-github"></i></a>
                            <a href="${member.twitter}" aria-label="Twitter profile of ${member.name}" title="Twitter"><i class="fab fa-twitter"></i></a>
                            <a href="${member.linkedin}" aria-label="LinkedIn profile of ${member.name}" title="LinkedIn"><i class="fab fa-linkedin"></i></a>
                        </div>
                    </a>
                `;
            } else {
                memberDiv.innerHTML = `
                    <div class="image-wrapper">
                        <img src="${member.img}" alt="${member.name}" class="team-member-img" />
                    </div>
                    <h3>${member.name}</h3>
                    <p class="role">${member.role}</p>
                    <div class="social-links">
                        <a href="${member.github}" aria-label="GitHub profile of ${member.name}" title="GitHub"><i class="fab fa-github"></i></a>
                        <a href="${member.twitter}" aria-label="Twitter profile of ${member.name}" title="Twitter"><i class="fab fa-twitter"></i></a>
                        <a href="${member.linkedin}" aria-label="LinkedIn profile of ${member.name}" title="LinkedIn"><i class="fab fa-linkedin"></i></a>
                    </div>
                `;
            }

            // Append to container
            teamContainer.appendChild(memberDiv);
        });

        // Initialize AOS (Animate On Scroll)
        AOS.init();