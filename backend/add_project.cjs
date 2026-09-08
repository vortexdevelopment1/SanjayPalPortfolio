require('dotenv').config({ path: 'C:\\template to html\\backend\\.env' });
const mongoose = require('mongoose');
const Project = require('C:\\template to html\\backend\\src\\models\\Project.js');

async function seedProject() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB');

    const buildFlowProject = new Project({
      title: 'BuildFlow ERP',
      category: 'Enterprise Software / SaaS',
      status: 'Live in Production',
      summary: 'An All-In-One Construction ERP Platform that empowers construction enterprises to manage projects, BOQs, site logs, procurement, and finances in one unified workspace.',
      image: '/buildflow-erp.png',
      techStack: [],
      overview: 'BuildFlow is an integrated construction lifecycle platform designed to replace legacy operations and eliminate material waste. It seamlessly synchronizes records automatically across the entire project lifespan—from tender bidding down to project closeout and handover. By digitizing manual workflows like Excel estimates, WhatsApp diaries, paper tickets, and manual roster logs, the platform bridges the gap between field operations and the office, ultimately driving up to a 25% reduction in project delays.',
      keyFeatures: [
        'Sales Prospect & CRM Lead Management for tracking opportunities and conversions.',
        'Advanced Quotation & Estimation with BOQ Quantity Lock to prevent scope creep and budget overruns.',
        'Comprehensive Project Planning with Gantt charts, milestones, and resource scheduling.',
        'Automated Procurement & Purchase Orders validated against approved BOQ ceilings.',
        'Real-time Site Safety Watch, Incident Alerting, and Inventory tracking.'
      ],
      architecture: 'A highly scalable cloud-based ERP architecture designed for real-time synchronization between on-site field mobile operations and web-based office dashboards. Features robust role-based access control (RBAC), automated approval workflows, and secure database pipelines for unified enterprise data management.',
      featured: true,
      githubUrl: '',
      liveUrl: ''
    });

    await buildFlowProject.save();
    console.log('Project saved successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error saving project:', err);
    process.exit(1);
  }
}

seedProject();
