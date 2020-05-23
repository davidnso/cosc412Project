package com.api.drivers;

import java.io.IOException;
import java.net.URLEncoder;
import java.net.MalformedURLException;
import java.util.ArrayList;
import java.util.List;

import com.api.interfaces.SearchQuery;
import com.api.interfaces.SearchResult;
import com.gargoylesoftware.htmlunit.FailingHttpStatusCodeException;
import com.gargoylesoftware.htmlunit.WebClient;
import com.gargoylesoftware.htmlunit.html.HtmlAnchor;
import com.gargoylesoftware.htmlunit.html.HtmlElement;
import com.gargoylesoftware.htmlunit.html.HtmlPage;

public class FI_Driver {

	public static List<SearchResult> fetchFromKixify(SearchQuery query) { 
		try {
			if(query !=null && query.getText().length()>1) {
				String formattedQuery = query.getText().replace(" ", "+").toLowerCase();
//				return interactor.fetchFromKixify(formattedQuery, query.getSize(), query.getPrice(), null);
				return perfromSearch(formattedQuery, query.getSize(), query.getPrice(), query.getCondition(), query.getGender(), query.getCategory());
			}else {
				return new ArrayList<SearchResult>();
			}
		} catch (Error e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return new ArrayList<SearchResult>();
	}
	
	private static List<SearchResult> perfromSearch(String queryText, String size,String price, String condition, String gender, String category){
		List<SearchResult> fullResults = new ArrayList();
		try {
			List<SearchResult> kixifyResult = interactor.fetchFromKixify(formatSpaces(queryText, false, "+"), size, price, condition);
			List<SearchResult> ebayResult = interactor.fetchFromEbay(formatSpaces(queryText, false, "+"), size, price, condition, gender, category);
			
			fullResults.addAll(kixifyResult);
			fullResults.addAll(ebayResult);
			
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return fullResults;
	}
	
	private static String formatSpaces(String text, Boolean urlEncode, String replacement) {
		if(urlEncode) {
			//url encode the query...
		}
		return text.replace(" ", replacement);
	}
	
}

class interactor { 
    public static List<SearchResult> fetchFromEbay(String queryText, String size,String price, String condition, String gender, String category) throws InterruptedException { 
    	String baseUrl = buildEbayUrl(category, gender, size, price);
    	baseUrl = baseUrl.concat("&_nkw="+queryText);
		WebClient client = new WebClient();
		client.getOptions().setCssEnabled(false);
		client.getOptions().setJavaScriptEnabled(false);
        client.getOptions().setUseInsecureSSL(true);

		List<SearchResult> searchResults = new ArrayList();

		
		try {
			HtmlPage page = client.getPage(baseUrl);
			if(!page.isDisplayed()){
				System.out.println("No items found !");
				
			}else{
				System.out.println("page found " + baseUrl);
				page.getTitleText();
				List<HtmlElement> items = page.getByXPath("//li[contains(@class, 's-item')]");
				for(HtmlElement item : items) {
					SearchResult result = new SearchResult();
					
					String name = item.getVisibleText();
					HtmlAnchor anchor = (HtmlAnchor) item.getFirstByXPath(".//div//a");
					HtmlElement itemName = (HtmlElement) item.getFirstByXPath(".//h3[@class='s-item__title']");
					HtmlElement itemPrice = (HtmlElement) item.getFirstByXPath(".//span[@class='s-item__price']");

					if(anchor !=null) {
						result.setUrl(anchor.getHrefAttribute());
					}
//					System.out.println(anchor.getAttribute("href"));
//					result.setUrl(anchor.getAttribute("href").toString());
					if(itemName != null) {
						result.setName(itemName.asText());
						result.setPrice(itemPrice.asText());
						result.setSource("Ebay");
						searchResults.add(result);
					}
					
								}
			}
			
			client.close();
            return searchResults;    

		} catch (FailingHttpStatusCodeException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			client.close();

		} catch (MalformedURLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			client.close();

		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			client.close();

		}
		
		return searchResults;
}
    
    private static String buildEbayUrl(String category, String gender,String size, String price) {
    	String base = "https://www.ebay.com/sch";
    	if(category == null) { 
    		base =  base.concat("/11450");

    	}else {
    		if(gender.contains("men")) {
    	    	switch(category) {
    	    	case "clothing": 
    	    		base = base.concat("/1059");
    	    		break;
    	    	case "footwear": 
    	    		base = base.concat("/93427");
    	    		break;

    	    	case "accessories": 
    	    		base = base.concat("/4250");
    	    		break;

    	    	default: 
        	    	base = base.concat("/260012");
    	    		break;


    	    	}

    		}
    	    if(category.contains("women"))
    	    	switch(category) {
    	    	case "clothing": 
    	    		base = base.concat("/15724");
    	    		break;

    	    	case "footwear": 
    	    		base = base.concat("/15724");
    	    		break;

    	    	case "accessories": 
    	    		base = base.concat("4251");
    	    		break;

    	    	default: 
        	    	base = base.concat("/260010");
    	    		break;


    	    	}    	
    	    }
    	base = base.concat("/i.html?");
    	return appendQueryFilters(base, gender, size, price, category);

    	
    }
    
    private static String appendQueryFilters(String url, String gender, String size, String price, String category) {
    	if(category.contains("footwear"))
    	switch(gender) {
    	case "men": 
    		url = url.concat("US%2520Shoe%2520Size%2520%2528Men%2527s%2529="+size);
    		break;
    	case "women": 
    			url = url.concat("US%2520Shoe%2520Size%2520%2528Women%2527s%2529="+size);
    		break;
    		default:
    	}
    	
    	if(price.length() > 0) { 
    		url = url.concat("&_udhi="+price);
    	}
    	
    	return url;
    }
    

        public static List<SearchResult> fetchFromKixify(String queryText, String size,String price, String condition) throws InterruptedException { 
    	String baseUrl = "https://www.kixify.com/search?s="+ queryText ;
    	if(size!=null) {
        	baseUrl = baseUrl.concat("&size[]="+size);

    	}
    	
    	if(price!=null) {
    		baseUrl = baseUrl.concat("&price="+price);
    	}
    	if(condition !=null) {
    		if(!condition.contains("new") || !condition.contains("deadstock")) {
        		baseUrl = baseUrl.concat("condition[]=Pre+Owned");

        	}else {
        		baseUrl = baseUrl.concat("condition[]=Brand+New");
        	}
    	}
    	
    	
		WebClient client =  ClientBuilder.getInstance();
		client.getOptions().setCssEnabled(false);
		client.getOptions().setJavaScriptEnabled(false);
        client.getOptions().setUseInsecureSSL(true);
		List<SearchResult> searchResults = new ArrayList();
		
		try {
			HtmlPage page = client.getPage(baseUrl);
			if(!page.isDisplayed()){
				System.out.println("No items found !");
				
			}else{
				System.out.println("page found: "+ page.getTitleText());
				List<HtmlElement> items = page.getByXPath("//div[contains(@class, 'col-xs-6 col-sm-3 col-md-3 product-teaser')]");
				
				for(HtmlElement item : items) {
					SearchResult result = new SearchResult();
					
					System.out.println(item.getVisibleText());
					String href = ((HtmlAnchor)item.getFirstByXPath(".//a[@class='thumbnail']")).getHrefAttribute();
					String imageUrl = ((HtmlElement)item.getFirstByXPath(".//img[@class='img-responsive imagecache imagecache-product_list']")).getAttribute("src");
					String[] values = item.getVisibleText().split("[\n]");
					result.setUrl("https://www.kixify.com"+href);
					result.setImageUrl(imageUrl);
					result.setName(values[0]);
					result.setPrice(values[1]);
					result.setSource("Kixify");
					searchResults.add(result);
                }
            return searchResults;    

            }
			
            client.close();
            return searchResults;

		} catch (FailingHttpStatusCodeException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			client.close();

		} catch (MalformedURLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			client.close();

		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			client.close();

		}
        return searchResults;
}
}

class ClientBuilder{
    private static WebClient instance = null; 

    ClientBuilder(){
        instance = new WebClient();
    }
    
    public static WebClient getInstance(){
        if(instance == null)
            instance = new WebClient();

            return instance;
    }

    public static void deleteInstance(){
        if(instance !=null)
        ((WebClient) instance).close();
    }
}

