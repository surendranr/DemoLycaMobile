
# **Edge Delivery Services**

# What is Edge Delivery Services?
Edge Delivery Services is an add-on to AEMaaCS. It’s a revolutionary content authoring solution that creates a web authoring experience that is easy for authors to understand while still offering the tools for a more robust experience to advanced layout.

Edge Delivery Services is an add-on to AEMaaCS. It’s a revolutionary content authoring solution that creates a web authoring experience that is easy for authors to understand while still offering the tools for a more robust experience to advanced layout.

AEM Franklin, project Helix, AEM Edge delivery services or Document Based Authoring are different names of same project.

Adobe has added a new layer in parallel to AEM publish layer which has no dependency on AEM publish and referred as “Edge Delivery Services”.  AEM Author or Publish tier is not mandatory to use it as this feature supports new way of document authoring referred as “Document Based Authoring”.

The content in EDS (Edge delivery services) can be created/published either through usual AEM components on Author environment or through Google Docs, Google sheet, Microsoft Docs, Microsoft Sheet as part of Document based authoring.

To use AEM authoring environment, Adobe Support help is needed to enable this feature, plus You need to optimize existing component’s DOM Structure to run it on Edge Delivery services. Also, newly introduced Universal Editor/Page editor can be utilized which, I think, is only available for premium support customer as of now. 
##

## Edge Delivery Service Architecture
Architecture contains three layers:

- Client infra
- Edge Delivery Services
- Authoring

**Authoring**

We have multiple ways of creating content. We can use AEM Authoring with the help of universal editor.

The important and main source of content is Document based authoring. For document based authoring we can use either google docs or microsoft word/excel to create content.

Code and configuration are stored in github repo.

**Edge Delivery Services**

Micro service based server less infrastructure build on cloud. It has storage, computing and CDN.

Content hub is storage. This is used to store asset, content, code and configuration.

Pipeline services are reponsible for transforming content to hypermedia.
###
### **Why Edge delivery services?**
###
Websites build through Edge Delivery Services exponentially improves performance. It does so by various optimization techniques, which can provide lightning-fast loading times. Employing vanilla JavaScript, and only loading scripts when needed, avoids unnecessary delays in rendering helps in page performance.

Adobe Edge Delivery Services empowers creators to author content easily with well-understood tools, and deliver it with fantastic pagespeed scores. Striking a balance between simplicity and functionality, Edge Delivery Services opens up exciting possibilities for content-rich websites, such as articles and blogs.

EDS shortens development processes by eliminating the authoring dialog, need for training and documentation.  Instead of a linear approach where content sits somewhere in the middle of a lengthy process, EDS actually starts with content, and development and design happen in parallel.

### **How to setup Edge delivery services?**
###
Prerequisites:

- GitHub account.
- Google account.
- Basics of HTML, CSS and JavaScript

Steps:

1. Create a public Git repo using the Boilerplate GitHub repo as a template. [https://github.com/adobe/aem-boilerplate](https://www.linkedin.com/redir/redirect?url=https%3A%2F%2Fgithub.com%2Fadobe%2Faem-boilerplate&urlhash=gK7G&trk=article-ssr-frontend-pulse_little-text-block). 
1. Install the [AEM Code Sync GitHub App](https://www.linkedin.com/redir/redirect?url=https%3A%2F%2Fgithub.com%2Fapps%2Faem-code-sync&urlhash=yHq3&trk=article-ssr-frontend-pulse_little-text-block) on your repository by visiting this link: [https://github.com/apps/aem-code-sync/installations/new](https://www.linkedin.com/redir/redirect?url=https%3A%2F%2Fgithub.com%2Fapps%2Faem-code-sync%2Finstallations%2Fnew&urlhash=vcQ2&trk=article-ssr-frontend-pulse_little-text-block) 
1. Add content in your google docs.
1. Share docs with <helix@adobe.com> 
1. Update fstab.yaml configuration file  to point to your Google Drive 

Publishing Process:

To publish content from Docs/ Sheet to delivery services, Adobe provided a browser extension plug-in called sidekick for chrome and safari. This sidekick can be used for different activities like switch different env, delete pages, Un-publish pages, edit, or publish pages to preview or live environment. It will show as a bar in your chrome browser.

Sidekick can be downloaded from below urls

[https://chromewebstore.google.com/detail/aem-sidekick/ccfggkjabjahcjoljmgmklhpaccedipo?pli=1](https://www.linkedin.com/redir/redirect?url=https%3A%2F%2Fchromewebstore.google.com%2Fdetail%2Faem-sidekick%2Fccfggkjabjahcjoljmgmklhpaccedipo%3Fpli%3D1&urlhash=njE4&trk=article-ssr-frontend-pulse_little-text-block)



There are 2 environments available in EDS called preview and live. Following are the respective URLs for it.

Preview URL: https://<branch>-<Repo>-<owner>.aem.page/path

Live URL: https://<branch>-<Repo>-<owner>.aem.live/path

The difference between preview & production environment is: “.page” is used for preview and “.live” is used for production live system. 

