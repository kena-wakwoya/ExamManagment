
# Exam Managment.

## Features

- **Create Exams:** Define new exams with titles, durations, and associated MCQs.
- **Manage MCQs:** Create, retrieve, update, and delete multiple-choice questions linked to specific exams.
- **Database:** Uses MongoDB to store exam and MCQ data.

---

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/kena-wakwoya/ExamManagment.git
   ```

2. Install dependencies:

   ```bash
   cd ExamManagment
   npm install
   ```
- For the Frontend part, ```bash cd frontend npm install```
- To run the frontend part, use `npm start`
3. Configure MongoDB:

   - Make sure MongoDB is installed and running Or use mongo atlas.
   - Update the MongoDB connection string in `.env` or you can directly replace the `uri` value in `configs/db.js`.

4. Start the application:

   ```bash
   npm run dev

   ```

   The server will be running on http://localhost:4040 by default.

---

## API Endpoints

### Exams

- **GET /exams:** Retrieve all exams.
- **POST /exams:** Create a new exam.
- **GET /exams/:examId:** Retrieve details of a specific exam.
- **PUT /exams/:examId:** Update details of a specific exam.
- **DELETE /exams/:examId:** Delete a specific exam.

### MCQs

- **GET /mcqs:** Retrieve all MCQs.
- **POST /mcqs:** Create a new MCQ.
- **GET /mcqs/:mcqId:** Retrieve details of a specific MCQ.
- **PUT /mcqs/:mcqId:** Update details of a specific MCQ.
- **DELETE /mcqs/:mcqId:** Delete a specific MCQ.

---

## Deployment Steps on AWS.

### Step 1: Prepare React App for Production
- Build the application for production using the following command

```bash
npm run build
```

### Step 2: Prepare Node.js Backend for Production

I Use a process manager like `pm2` for production to run the application :

```bash
# Install pm2 globally
npm install -g pm2

# Start your Node.js app with pm2
pm2 start server.js
```

### Step 3: Choose AWS Services

- Amazon EC2 for hosting both Node.js backend and MongoDB.
- Amazon S3 for hosting the React app.

### Step 4: Set Up an AWS Account

Considering you already have an account, lets login with the credentials .

### Step 5: Deploy React App to Amazon S3

1. Create an S3 Bucket:
   - Log in to the AWS Management Console.
   - Navigate to Amazon S3.
   - Create a new bucket (e.g., `exam-managment-bucket`).

2. Upload React Build:
   - Upload the contents of the `build` folder to the S3 bucket.

3. Configure Static Website Hosting:
   - In the S3 bucket properties, go to "Static website hosting."
   - Enable static website hosting and set the index document (e.g., `index.html`).

### Step 6: Deploy Node.js Backend and MongoDB on EC2

1. Set Up EC2 Instances:
   - Launch EC2 instances for the Node.js backend and MongoDB. Ensure they are in the same security group and VPC. And don't forget to consider price when choosing EC2 type.

2. Install Node.js and MongoDB on EC2:
   - Since EC2 linux server is like our local linux pc, connect into it using ssh and key generated during launching the instance and setup it.
   - SSH into the EC2 instance.
   - clone the git repository on it and install all dependencies using ` npm install `
   - Install and set up MongoDB.

3. Update Node.js App Configuration:
   - Update Node.js app configuration to use the correct MongoDB connection string (pointing to the MongoDB EC2 instance).

4. Run Node.js App:
   - Start the Node.js app using `pm2` or any other process manager.

### Step 7: Configure Security Groups and Networking

1. Security Groups:
   - Configure security groups to allow traffic between our React app on S3, Node.js backend on EC2, and MongoDB on EC2.

2. Update MongoDB Security:
   - Configure MongoDB security settings to allow connections from our Node.js backend.

### Additional Considerations:

- We can also consider using CI/CD like Code build, Jenkins or Github action to automate our deployment process


