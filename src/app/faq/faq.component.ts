import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-faq",
  templateUrl: "./faq.component.html",
  styleUrls: ["./faq.component.css"]
})
export class FaqComponent implements OnInit {
  tabView = 1;

  constructor() {}

  ngOnInit() {
    window.scrollTo(0, 0);
  }
  check(evt) {
    console.log(evt);
  }

  faqs = [
    {
      ques: "What is People Infinia? - Client & Consultant",
      ans: `<p>
          People Infinia is India’s first AI powered
          recruitment platform that enables clients to work
          with 1000’s of freelance recruiters & firms for
          their recruitment requirement without managing any
          of them. The technology aims at streamlining the
          otherwise chaotic recruitment process with minimum
          human intervention. With the website driven by a
          world class technology, every client gets the
          perfect candidates for the position and every
          recruiter gets a fair chance to help the client
          close those positions.
          </p>`
    },

    {
      ques: "What are the advantages to use People Infinia?",
      ans: `<p>
          AConsultants: People Infinia only shares the
          positions with a recruiter basis their interest
          level. So if a recruiter want to work on a sales
          profile we will only share sales positions with that
          recruiter. With our world class technology a
          recruiter can also schedule the interview from the
          platform.
          </p>
          <p>
          Clients: People Infinia works with 1000’s of
          recruiters. Once you share your position with us,
          the same will be shared with relevant and active
          recruiters with proven track record to close those
          positions. We assure to deliver the right candidate
          with 7 working days with our effective 03 steps
          screening.
        </p>`
    },

    {
      ques: "How does People Infinia work?",
      ans: `<p>
        Consultant: Once you fill your complete profile with
        us, we will start sharing the relevant positions
        with you. After sharing the CV and candidate data in
        an excel format, we will share it with the client
        post our screening. Once your candidate gets
        shortlisted, we will share the profit with the
        recruiter.
      </p>
      <p>
        Clients: Share your positions with us and relax
        because we have experts working for you. You will
        start getting the CV’s within 48 working hours. You
        can shortlist and ask for an interview from the
        portal.
      </p>`
    },

    {
      ques: "Where is People Infinia located? - Client & Consultant",
      ans: `<p>
        Corporate office:- Unit No. 305, 3rd Floor, North Ex
        Mall, Sector 9, Rohini, Delhi – 110085.
      </p>
      <p>
        Regional office:- Basement Villa 6109, DLF Phase 4,
        Behind Supermarket 1, Golf Course Road, Gurugram,
        Haryana.
      </p>`
    },
    {
      ques:
        "Will I get access to the contact details of the recruiters or clients? - Client & Consultant",
      ans: `<p>
        No, you will not get access to the contact details
        of the recruiters or client.
      </p>`
    },

    {
      ques:
        "What happens if the candidate does not turn up for the job interview?",
      ans: `<p>
        Recruiter: In such scenario a recruiter can
        reschedule the interview with the clients consent.
        If the same thing is repeated twice, we disregard
        the candidate from future prospective roles.
      </p>
      <p>
        Clients: You can ask to reschedule the interview. A
        People Infinia representative will get in touch with
        you.
      </p>`
    },

    {
      ques:
        "What happens if the candidate does not turn up for the job interview?",
      ans: `<p>
        If you do not have the other candidates scheduled
        for the interview, in that case you can resume the
        job posting and start getting the fresh resumes. If
        you want to reschedule the interview with the same
        candidate, you can reach out to us to make that
        happen. In case you were not informed in advance
        about the candidate’s no show, we highly recommend
        you to leave review and write feedback to help us
        maintain the quality of the platform.
      </p>`
    },

    {
      ques: `What happens if the candidate joins but leaves within
        few days of joining? - Client`,
      ans: `<p>
        If a candidate leaves within 03 months of placement,
        we will provide you with a replacement without any
        extra charge.
      </p>
      <cite
        ><i
          >Note: The fee will be charged on revised package
          offered to the candidate which could be less or
          more than the one left.</i
        ></cite>`
    },

    {
      ques: "Who pays to the recruiter? – Client & Consultants",
      ans: `<p>
        People Infinia collects the payment from the clients
        and pays the recruiter
      </p>`
    },

    {
      ques: `Will People Infinia assist me in posting the jobs? -
        Client`,
      ans: `<p>
        Yes, we are always happy to help. Please call our
        posting expert at: 123456789
      </p>`
    },

    {
      ques: "Is People Infinia working completely working on AI?",
      ans: `<p>
        Finding a single recruitment agency who can cater to
        all your job requirements is hard. If this is your
        first time to recruit an agency, finding the perfect
        one is going to be even harder. With People Infinia,
        you get access to 1000’s of recruiters and agencies
        without actually managing them. While working with a
        recruitment agency, it is typical for you to
        encounter multiple irrelevant resumes and lack of
        diversity. People Infinia with its 2 step screening
        sends you only the relevant resumes that may come
        from multiple recruiters.
      </p>`
    },

    {
      ques: "Is People Infinia working completely working on AI?",
      ans: ` <p>
        Yes you can post jobs in more than one location or
        can even choose to post multiple jobs basis
        different location.
      </p>`
    }
  ];




  faqs2 = [
    {
      ques: `How is People Infinia defferent than any other
      recruitment portal? - Client & Consultant`,
      ans: `<p>
      People Infinia works on proprietary algorithm which
      helps the client to work with industry experts and
      likewise, a recruiter gets a chance to work with the
      best clients basis their skillset. Our TAT is our
      USP along with efficient 03 step screening which
      ensures a client gets the best candidate for the
      position.
    </p>`
    },
    {
      ques: " Can I post jobs in multiple functional areas? - Client",
      ans: `<p>
      No, you cannot post jobs in multiple functional
      area. But you can post multiple jobs using multiple
      functional areas
    </p>`
    },
    {
      ques: ` I want to hire candidates outside of India. Is People
      Infinia useful for me? - Client`,
      ans: `<p>
      No, currently we are serving only Indian Market.
    </p>`
    },
    {
      ques: `Can I decide what kind of consultants send me the
      resumes? - Client`,
      ans: ` <p>
      Yes, you can choose to work with selected
      consultants by sharing the job only with them.
    </p>`
    },
    {
      ques: `I want to hire candidates outside of India. Is People
      Infinia useful for me? - Client`,
      ans: `<p>
      No, currently we are serving only Indian Market.
    </p>`
    },
    {
      ques: `Why can’t I simply hire a recruitment agency instead
      of People Infinia? - Client`,
      ans: `<p>
      People Infinia works with 1000’s of recruiter
      instead of one recruitment agency. Our TAT along
      with right fit candidate is our USP which will help
      you close the desired position within deadline at an
      efficient cost.
    </p>`
    },
    {
      ques: `What kind of industries can i post on people Infinia?
      - Client`,
      ans: ` <p>You can post for any industry on People Infinia</p>`
    },
    {
      ques: `How long will it take till I start getting job
      candidates? - Client`,
      ans: `<p>
      We do not assign a job candidate to our clients.
      Instead we share the job with multiple relevant
      recruiters who work on the position. We strive our
      best to start sharing the CV’s with you within 48
      working hours.
    </p>`
    },
    {
      ques: `Can I keep my job post confidential? - Client`,
      ans: `<p>
      Yes, you can choose not to disclose your name to the
      recruiters
    </p>`
    },
    {
      ques: `What happens if 2 recruiters submit the same resume? -
      Consultant`,
      ans: `<p>
      The recruiter who submits the resume first will be
      considered as the profile shared. The recruiter who
      submits the duplicated resume will be notified with
      48 working hours.
    </p>`
    }
  ];

  faqs3 = [
    {
      ques: `How is People Infinia different than any other
      recruitment portal? - Client & Recruiter`,
      ans: `<p>
      People Infinia works on proprietary algorithm which
      helps the client to work with industry experts and
      likewise, a recruiter gets a chance to work with the
      best clients basis their skillset. Our TAT is our
      USP along with efficient 03 step screening which
      ensures a client gets the best candidate for the
      position.
    </p>`
    },
    {
      ques: `What kind of industries can I post on People Infinia?
      - Client`,
      ans: `<p>You can post for any industry on People Infinia</p>`
    },
    {
      ques: `How long will it take till I start getting job
      candidates?- Client`,
      ans: `<p>
      We do not assign a job candidate to our clients.
      Instead we share the job with multiple relevant
      recruiters who work on the position. We strive our
      best to start sharing the CV’s with you within 48
      working hours..
    </p>`
    },
    {
      ques: `Can I keep my job post confidential? – Client`,
      ans: `<p>
      Yes, you can choose not to disclose your name to the
      recruiters
    </p>`
    },
    {
      ques: `What happens if 2 recruiters submit the same resume? –
      Recruiter`,
      ans: `<p>
      The recruiter who submits the resume first will be
      considered as the profile shared. The recruiter who
      submits the duplicated resume will be notified with
      48 working hours.
    </p>`
    },
    {
      ques: `What happens if the candidate joins but leaves within
      few days of joining? - Client`,
      ans: `<p>
      If a candidate leaves within 03 months of placement,
      we will provide you with a replacement without any
      extra charge.
    </p>
    <cite
      >Note: The fee will be charged on revised package
      offered to the candidate which could be less or more
      than the one left.</cite>`
    }
  ];



  faqs4 = [
    {
      ques: `What is the pricing for the People Infinia?`,
      ans: `<p>
      People Infinia collects the payment from the clients
      and pays the recruiter
    </p>`
    },
    {
      ques: ` Will People Infinia assist me in posting the jobs? -
      Client`,
      ans: `<p>
      Yes, we are always happy to help. Please call our
      posting expert at: 123456789
    </p>`
    },
    {
      ques: `Why can’t I simply hire a recruitment agency instead
      of People Infinia? - Client`,
      ans: `<p>
      People Infinia works with 1000’s of recruiter
      instead of one recruitment agency. Our TAT along
      with right fit candidate is our USP which will help
      you close the desired position within deadline at an
      efficient cost.
    </p>`
    },
    {
      ques: `Can I post jobs for more than 1 location? - Client`,
      ans: `<p>
      Yes you can post jobs in more than one location or
      can even choose to post multiple jobs basis
      different location.
    </p>`
    },
    {
      ques: `Can I post jobs in multiple functional areas? - Client`,
      ans: `<p>
      No, you cannot post jobs in multiple functional
      area. But you can post multiple jobs using multiple
      functional areas.
    </p>`
    },
    {
      ques: ` I want to hire candidates outside of India. Is People
      Infiniauseful for me? - Client`,
      ans: `<p>
      No, currently we are serving only Indian Market.
    </p>`
    },
    {
      ques: `Can I decide what kind of consultants send me the
      resumes? - Client`,
      ans: `<p>
      Yes, you can choose to work with selected
      consultants by sharing the job only with them.
    </p>`
    }
  ];

  faqsControl = (this.faqs as Array<any>).map(item => {
    return { isHidden: true };
  });
  faqController(index) {
    this.faqsControl[index].isHidden = !this.faqsControl[index].isHidden;
  }

  faqsControl2 = (this.faqs2 as Array<any>).map(item => {
    return { isHidden: true };
  });
  faqController2(index) {
    this.faqsControl2[index].isHidden = !this.faqsControl2[index].isHidden;
  }

  faqsControl3 = (this.faqs3 as Array<any>).map(item => {
    return { isHidden: true };
  });
  faqController3(index) {
    this.faqsControl3[index].isHidden = !this.faqsControl3[index].isHidden;
  }

  faqsControl4 = (this.faqs4 as Array<any>).map(item => {
    return { isHidden: true };
  });
  faqController4(index) {
    this.faqsControl4[index].isHidden = !this.faqsControl4[index].isHidden;
  }
}
