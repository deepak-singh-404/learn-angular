import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { v4 as uuidv4 } from "uuid";
import queryString from "query-string";

@Component({
  selector: 'app-truecaller-user-flow',
  templateUrl: './truecaller-user-flow.component.html',
  styleUrls: ['./truecaller-user-flow.component.css']
})
export class TruecallerUserFlowComponent implements OnInit {
  private requestId: string = "";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.requestId = this.generateUuid();

    // Define your params object
    const params = {
      type: 'btmsheet',
      requestNonce: this.requestId,
      partnerKey: 'o68do1c71f3f1e8af4c13af239b29cd3b1eba',
      partnerName: 'moglix-app-qa',
      lang: 'en',
      privacyUrl: '',
      termsUrl: '',
      loginPrefix: 'continue',
      loginSuffix: 'signin',
      ctaPrefix: 'continuewith',
      ctaColor: '%23f75d34',
      ctaTextColor: '%23f75d34',
      btnShape: 'rect',
      skipOption: '',
      ttl: 8000,
    };

    // Convert params object to a query string
    const query = this.createQueryString(params);

    // Construct the URL
    const url = `truecallersdk://truesdk/web_verify?${query}`;

    // Open the URL in a new window
    window.open(url);

    // Set a timeout to check if the Truecaller app was installed
    const timeoutId = setTimeout(() => {
      if (document.hasFocus()) {
        alert("Oops, it seems like you don't have the Truecaller app installed.");
      } else {
        this.fetchTruecallerUserFlow(this.requestId);
      }
    }, 600);

    // Clear the timeout when the component is destroyed
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        clearTimeout(timeoutId);
      }
    });
  }

  generateUuid(): string {
    return uuidv4();
  }

  createQueryString(params: any): string {
    return queryString.stringify(params);
  }

  fetchTruecallerUserFlow(requestId: string): void {
    const apiUrl = `https://nodeapiqa.moglilabs.com/nodeApi/v1/auth/truecaller/fetch?requestId=${requestId}`;

    this.http.get(apiUrl).subscribe(
      (response: any) => {
        if (response.status) {
          alert(JSON.stringify(response.data.truecallerApiResp));
        } else {
          alert(response.description);
        }
      },
      (error) => {
        alert(`Something went wrong ${error.message}`);
      }
    );
  }
}
