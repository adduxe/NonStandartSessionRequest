# RNR Session Request API 
> see http://localhost:1615/dataapi/swagger/ui/index#/ 
#> see http://oweb7-vm.usc.edu/dataapi/swagger/ui/index#/

> see https://aka.ms/autorest 

## Getting Started 
To generate the API client for RNR Session Request API, simply install AutoRest via `npm` (`npm install -g autorest`) and then run the following in the directory of this readme file:
> `autorest`

To see additional help and options, run:
> `autorest --help`

For other options on installation see [Installing AutoRest](https://aka.ms/autorest/install) on the AutoRest github page.

---

## Configuration 
The following settings are used for generating the API client using AutoRest.

``` yaml
# Location of the OpenAPI file
input-file: http://localhost:1615/DataApi/swagger/docs/sessionrequest
#input-file: http://oweb7-vm.usc.edu/DataApi/swagger/docs/sessionrequest

# Language code generator options
csharp:
  namespace: SessionRequestApi.Client
  output-folder: Generated
```