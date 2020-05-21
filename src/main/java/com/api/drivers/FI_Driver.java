package com.api.drivers;

import java.io.IOException;
import java.net.MalformedURLException;
import java.util.ArrayList;
import java.util.List;

import com.api.interfaces.SearchResult;
import com.gargoylesoftware.htmlunit.FailingHttpStatusCodeException;
import com.gargoylesoftware.htmlunit.WebClient;
import com.gargoylesoftware.htmlunit.html.HtmlAnchor;
import com.gargoylesoftware.htmlunit.html.HtmlElement;
import com.gargoylesoftware.htmlunit.html.HtmlPage;

public class FI_Driver {

	public static List<SearchResult> fetchFromKixify() { 
		try {
			return interactor.htmlUnitKixify();
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return new ArrayList<SearchResult>();
	}
	
}

class interactor { 
    public static void htmlUnitEbay() throws InterruptedException { 
    	String baseUrl = "https://www.ebay.com/sch/i.html?&_nkw=Jordan+5+metallic" ;
		WebClient client = new WebClient();
		client.getOptions().setCssEnabled(false);
		client.getOptions().setJavaScriptEnabled(false);
        client.getOptions().setUseInsecureSSL(true);

		
	
		
		try {
			HtmlPage page = client.getPage(baseUrl);
			if(!page.isDisplayed()){
				System.out.println("No items found !");
				
			}else{
				System.out.println("page found");
				page.getTitleText();
				List<HtmlElement> items = page.getByXPath("//li[contains(@class, 's-item')]");
				System.out.println(items.get(0).getVisibleText());
			}
			
			client.close();
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
}
    public static List<SearchResult> htmlUnitKixify() throws InterruptedException { 
    	String baseUrl = "https://www.kixify.com/search?s=jordan+5+metallic+black" ;
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
					
					result.setImageUrl("www.kixify.com"+href);
					result.setName(item.getVisibleText());
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

