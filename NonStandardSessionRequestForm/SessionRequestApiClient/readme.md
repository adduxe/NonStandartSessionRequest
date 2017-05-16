# My API 
> see https://aka.ms/autorest 

## Getting Started 
To build the SDKs for My API, simply install AutoRest via `npm` (`npm install -g autorest`) and then run:
> `autorest readme.md`

To see additional help and options, run:
> `autorest --help`

For other options on installation see [Installing AutoRest](https://aka.ms/autorest/install) on the AutoRest github page.

---

## Configuration 
The following are the settings for this using this API with AutoRest.

``` yaml
# Location of the OpenAPI file
input-file: http://oweb7-vm.usc.edu/DataApi/swagger/docs/sessionrequest

# Language code generator options
csharp:
  namespace: SessionRequestApi.Client
  output-folder: Generated
```