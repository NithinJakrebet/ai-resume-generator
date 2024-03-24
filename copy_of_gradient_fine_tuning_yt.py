import os

os.environ['GRADIENT_ACCESS_TOKEN'] = "6FKwYaCTlDfTAARlSJTDjrLjs22AiaJN"
os.environ['GRADIENT_WORKSPACE_ID'] = "ad27a654-5afc-4573-8c66-9674a8313464_workspace"

import json


def convert_to_json_file():
    # Your JSON string
    json_data = "{\"firstName\":\"Ian\",\"lastName\":\"Olmstead\",\"email\":\"ianolmstead1991@gmail.com\",\"userName\":\"iolmstead23\",\"education\":\"Hawkeye\",\"linkedin\":\"\",\"github\":\"\",\"portfolio\":\"\",\"country\":[\"\"],\"state\":\"\",\"city\":\"Ely\",\"zip\":0,\"skills\":\"MAD SKILLS\",\"companyName_1\":\"\",\"startDate_1\":\"\",\"endDate_1\":\"\",\"companyName_2\":\"\",\"startDate_2\":\"\",\"endDate_2\":\"\",\"companyName_3\":\"\",\"startDate_3\":\"\",\"endDate_3\":\"\",\"region\":\"F\",\"postal-code\":\"\"}"

    # Parse the JSON string to a Python dictionary
    user_details_dict = json.loads(json_data)

    # Specify the filename
    filename = 'user_details.json'

    # Write the dictionary to a JSON file
    with open(filename, 'w') as file:
        json.dump(user_details_dict, file, indent=4)


def load_user_details(json_file):
    with open(json_file, 'r') as file:
        data = json.load(file)
    return data

from fpdf import FPDF


# Function to create a PDF file with the text from the completion variable
def create_pdf(firstname, lastname, text):
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size = 12)
    pdf.multi_cell(0, 10, txt = str(text))
    
    filename = f"{firstname}_{lastname}_cv.pdf"
    pdf.output(filename)
    print(f"PDF generated: {filename}")


from gradientai import Gradient


def main():
    with Gradient() as gradient:
        base_model = gradient.get_base_model(base_model_slug="nous-hermes2")

        new_model_adapter = base_model.create_model_adapter(
            name="test model 3"
        )
        # print(f"Created model adapter with id {new_model_adapter.id}")

        user_details = load_user_details('user_details.json')

        # Assuming user_details.json has 'employer', 'first_name', and 'last_name' keys
        company = user_details['companyName_1']
        firstname = user_details['firstName']
        lastname = user_details['lastName']

        while (prompt := input("Enter a prompt (q to quit): ")) != "q":


            # Update this line to dynamically include the extracted details
            sample_query = prompt

            print(f"Asking: {sample_query}")

            # before fine-tuning
            completion = new_model_adapter.complete(query=sample_query, max_generated_token_count=100).generated_output
            # print(f"Generated (before fine-tune): {completion}")

            # Define your samples variable here (assuming you've correctly defined it earlier)
            samples = [
                {
                    "inputs": f"### Instruction: Generate a concise list of skills and qualifications needed for a job at {company}. \n\n### Response: Skills and qualifications include:",
                    "response": f"Skills and qualifications include: - Proficiency in relevant software and technologies - Strong problem-solving abilities - Effective communication skills - Team collaboration experience - Understanding of {company}'s industry and market trends."
                },
                {
                    "inputs": "### Instruction: Generate a concise list of skills and qualifications needed for a software engineering job at Google. \n\n### Response: Skills and qualifications include:",
                    "response": "Skills and qualifications include: - Expertise in programming languages such as Python, Java, or C++ - Familiarity with algorithms and data structures - Experience with web technologies and cloud computing - Ability to work in a fast-paced environment - Passion for solving complex problems."
                },
                {
                    "inputs": "### Instruction: Generate a concise list of skills and qualifications needed for a marketing role at Tesla. \n\n### Response: Skills and qualifications include:",
                    "response": "Skills and qualifications include: - Strong analytical skills and ability to interpret data - Proficiency in digital marketing tools and platforms - Creative thinking for innovative marketing strategies - Knowledge of the automotive industry and electric vehicles - Excellent communication and presentation skills."
                },
                {
                    "inputs": "### Instruction: Generate a concise list of skills and qualifications needed for a project management job at Amazon. \n\n### Response: Skills and qualifications include:",
                    "response": "Skills and qualifications include: - Proven experience in project management methodologies - Ability to lead cross-functional teams - Excellent organizational and time management skills - Knowledge of eCommerce and logistics - Proficiency with project management software."
                },
                {
                    "inputs": "### Instruction: Generate a concise list of skills and qualifications needed for a data analyst position at Netflix. \n\n### Response: Skills and qualifications include:",
                    "response": "Skills and qualifications include: - Strong proficiency in SQL and Python - Experience with data visualization tools like Tableau or Power BI - Understanding of statistical analysis and forecasting models - Ability to derive insights from large datasets - Passion for the entertainment industry and content strategy."
                },
                {
                    "inputs": "### Instruction: Generate a concise list of skills and qualifications needed for a customer service role at Airbnb. \n\n### Response: Skills and qualifications include:",
                    "response": "Skills and qualifications include: - Excellent verbal and written communication skills - Empathy and ability to handle sensitive situations - Familiarity with CRM systems - Problem-solving skills and patience - Knowledge of the travel and hospitality industry."
                },
                {
                    "inputs": "### Instruction: Generate a concise list of skills and qualifications needed for an HR manager role at Microsoft. \n\n### Response: Skills and qualifications include:",
                    "response": "Skills and qualifications include: - Strong understanding of HR policies and laws - Experience with HR software and data analysis - Ability to manage and resolve workplace conflicts - Skills in talent acquisition and employee development - Excellent interpersonal and negotiation skills."
                }
                # You can add more samples for other roles, industries, or companies as needed.
            ]





            new_model_adapter.fine_tune(samples=samples)



            # After fine-tuning
            completion = new_model_adapter.complete(query=sample_query, max_generated_token_count=500).generated_output
            print(f"{completion}")

            # Call the create_pdf function here
            create_pdf(firstname, lastname, str(completion))

        new_model_adapter.delete()

if __name__ == "__main__":
    main()

