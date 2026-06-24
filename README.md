
<section class="max-w-5xl mx-auto px-6 py-12 prose prose-lg dark:prose-invert">
  <h1>About Macro Cosmos </h1>

  <p>
    <strong>Macro Cosmos</strong> is a full-stack intelligent routing platform designed to enhance daily commutes
    in San Diego, California through real-time data, community reporting, and AI-driven route optimization.
    Our goal is to make transportation more efficient, reliable, and adaptive.
  </p>

  <h2>Our Development Journey</h2>

  <p>
    This project began as a vision to help commuters navigate traffic congestion using smarter tools.
    Over time, it evolved into a complete routing system with real-time data visualization, predictive modeling,
    and user-focused design. Here's how we built it:
  </p>

  <h3>Phase 1: Ideation and Planning</h3>
  <p>
    Using <a href="https://www.figma.com/board/xwfhCP2XCuN0rcTtno0s83/Welcome-to-FigJam?node-id=0-1" target="_blank">Figma FigJam</a>,
    we brainstormed features and created system diagrams for our platform. We focused on key user needs:
    accurate travel times, customizable routines, and crowd-sourced hazard alerts.
  </p>

  <h3>Phase 2: Project Management</h3>
  <p>
    We used <a href="https://github.com/users/Ahaanv19/projects/1" target="_blank">GitHub Projects</a>
    to divide development into milestones:
  </p>
  <ul>
    <li><strong>Data Collection:</strong> Pulling real-time traffic feeds and San Diego open data</li>
    <li><strong>Modeling:</strong> Building an ML model to predict congestion based on patterns</li>
    <li><strong>Frontend UI:</strong> Designing intuitive interfaces for input, feedback, and live maps</li>
  </ul>

  <h3>Phase 3: Data + Mapping</h3>
  <p>
    We combined Leaflet maps with satellite overlays and built a real-time hazard display system.
    Users can report hazards, and their input is stored and shared with others on the map.
  </p>

  <h3>Phase 4: Machine Learning Integration</h3>
  <p>
    Our predictive routing engine uses <code>scikit-learn</code> to analyze traffic trends and deliver
    smarter routes based on time of day, historical congestion, and hazards. This ML layer powers the
    smart decision-making behind every route generated.
  </p>

  <h3>Phase 5: Simulation & Testing</h3>
  <p>
    We ran scenario-based tests using synthetic and real data to refine our predictions.
    This helped us ensure our backend logic was reliable under different traffic conditions.
  </p>

  <h2>Current Features</h2>
  <ul>
    <li><strong>Smart Route Finder:</strong> Uses ML to suggest fastest paths</li>
    <li><strong>Daily Routine Planner:</strong> Automates scheduling for recurring trips</li>
    <li><strong>Live Hazard Reporter:</strong> Publicly viewable hazard pins on map</li>
    <li><strong>Favorite Locations:</strong> Quick access to saved routes</li>
  </ul>

  <h2>What’s Next?</h2>
  <ol>
    <li>Finalize UI for mobile and desktop users</li>
    <li>Optimize backend response times</li>
    <li>Integrate weather and event data for added accuracy</li>
    <li>Prepare cloud deployment with Docker and CI/CD</li>
  </ol>

  <h2>Project Tools</h2>
  <ul>
    <li>Frontend: TailwindCSS, HTML, JavaScript, Leaflet</li>
    <li>Backend: Flask, Python, REST APIs, SQLAlchemy</li>
    <li>ML: Pandas, Scikit-learn, custom-trained models</li>
    <li>Collaboration: GitHub, Figma, Google Docs</li>
  </ul>

  
  <h2> How our Project Works</h2>
  <ul>
    <li>Login Verfication, Verify your location to get approved for a login</li>
    <li>Once you get approved, create an account and login</li>
    <li>Use our features! Try out our find best route navagation system for your next trip, or customize your experience with Favorite Locations or Daily Routine. For Favorite Location, input common locations, and for Daily Routine, create a time table schedule for your day.</li>
    <li>Report Hazards in San Diego using the hazard reporting feature.</li>
  </ul>

  <h2>Links</h2>
  <ul>
    <li><a href="https://www.figma.com/board/xwfhCP2XCuN0rcTtno0s83/Welcome-to-FigJam?node-id=0-1" target="_blank">Figma Planning Board</a></li>
    <li><a href="https://github.com/users/Ahaanv19/projects/1" target="_blank">GitHub Project Tracker</a></li>
  </ul>

  <p>
    We’re excited to continue iterating and improving Macro Cosmos to meet the growing needs of our
    community. Thanks for following our journey!
  </p>
</section>


<style>
  .dropdown {
    position: relative;
    display: inline-block;
  }

  .dropdown-btn {
    background-color: #4A90E2;
    color: white;
    padding: 10px 16px;
    font-size: 16px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
  }

  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 260px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
    border-radius: 6px;
  }

  .dropdown-content a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    border-bottom: 1px solid #ddd;
  }

  .dropdown-content a:hover {
    background-color: #f1f1f1;
  }

  .dropdown:hover .dropdown-content {
    display: block;
  }

  .dropdown:hover .dropdown-btn {
    background-color: #357ABD;
  }
</style>

<div class="dropdown">
  <button class="dropdown-btn">Quicklinks</button>
  <div class="dropdown-content">
    <a href="https://github.com/Ahaanv19/Poway_Auto_Frontend/issues/24" target="_blank">Deployment Guide Issue</a>
    <a href="https://github.com/Ahaanv19/Poway_Auto_Frontend/issues/25" target="_blank">Main Page Issue</a>
    <a href="https://github.com/Ahaanv19/Poway_Auto_Frontend/issues/26" target="_blank">Find Best Route Issue</a>
    <a href="https://github.com/Ahaanv19/Poway_Auto_Frontend/issues/26" target="_blank">Favorite Locations Issue</a>
    <a href="https://github.com/Ahaanv19/Poway_Auto_Frontend/issues/28" target="_blank">Daily Routine Issue</a>
    <a href="https://github.com/Ahaanv19/Poway_Auto_Frontend/issues/29" target="_blank">Technical Issue</a>
    <a href="https://github.com/Ahaanv19/Poway_Auto_Backend" target="_blank">GitHub Backend</a>
    <a href="https://github.com/Ahaanv19/Poway_Auto_Frontend" target="_blank">GitHub Frontend</a>
    <a href="https://autonomous.opencodingsociety.com/" target="_blank">Deployed Backend</a>
    <a href="https://github.com/users/Ahaanv19/projects/1/views/1" target="_blank">Kanban Board</a>
    <a href="https://cockpit.stu.nighthawkcodingsociety.com/" target="_blank">Ubuntu Cockpit Deployment</a>
  </div>
</div>



