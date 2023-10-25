from locust import HttpUser, task, between

class WebsiteClient(HttpUser):
    wait_time = between(1, 5)
    
    @task
    def api(self):
        self.client.get("/api")
    