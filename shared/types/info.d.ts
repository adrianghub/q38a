export interface Job
  extends Partial<{
    id: string;
    employer_name: string;
    employer_logo: string;
    employer_website: string;
    job_employment_type: string;
    job_title: string;
    job_description: string;
    job_apply_link: string;
    job_city: string;
    job_state: string;
    job_country: string;
  }> {}

export interface Country {
  name: {
    common: string;
  };
}
