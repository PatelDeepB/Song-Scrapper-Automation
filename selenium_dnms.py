from datetime import datetime as dttm
import json
from selenium import webdriver
import time
import logging, warnings
import os
from selenium.webdriver.chrome.options import Options as ChromeOptions

logging.basicConfig(level=logging.ERROR)
warnings.filterwarnings("ignore", category=DeprecationWarning)

chrome_options = webdriver.ChromeOptions()
download_directory = "/home/pragnakalpl40/Downloads/1/"
prefs = {"download.default_directory": download_directory}

# Allow multiple file downloads
prefs["profile.default_content_settings.popups"] = 0
prefs["safebrowsing.enabled"] = "false"
prefs["download.prompt_for_download"] = "false"
prefs["directory_upgrade"] = "true"
prefs["profile.default_content_setting_values.automatic_downloads"] = 1


chrome_options.add_experimental_option("prefs", prefs)
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--disable-popup-blocking")
chrome_options.add_argument("--disable-extensions")

driver = webdriver.Chrome(executable_path="../testing/chromedriver",options=chrome_options)

driver.get("https://downloadming.ws/category/bollywood-mp3-songs")

time.sleep(5)

try:
    driver.find_element_by_xpath("/html/body/div/div[2]/button[1]").click()
except:
    pass

print(1)

all_s_list = driver.find_element_by_id("category-title")


print(2)
all_links = all_s_list.find_elements_by_xpath("article")
# all_links = all_s_list
# print(all_links)

# with open("all_music_links.txt", "w") as file:
#     pass
# print(3)
# for index,a_link in enumerate(all_links):
#     print(4)
#     print(a_link.text)
#     all_href = a_link.find_element_by_xpath("h2/a").get_attribute("href")
#     # print(index)
#     # for link in all_href:
#     with open("all_music_links.txt","a") as file:
#         file.write(f"{all_href}\n")
#     # a_link.find_element_by_xpath("h2/a").click()
#     # print(5)
#     # all_s = driver.find_element_by_xpath("/html/body/div[1]/div[2]/section/article/div[3]/table/tbody")
#     # print(6)
#     # d_links = all_s.find_elements_by_xpath("tr")
#     # print(7)
#     # for d_link in d_links[1:]:
#     #     d_link.find_element_by_xpath("td[2]/a").click()
#     # driver.back()
#     # time.sleep(1)
with open("all_music_links.txt","r") as file:
    all_ls = file.readlines()

for index,ls in enumerate(all_ls):
    try:
        driver.get(ls)
        all_s = driver.find_element_by_xpath("/html/body/div[1]/div[2]/section/article/div[3]/table/tbody")
        print(6)
        d_links = all_s.find_elements_by_xpath("tr")
        print(7)
        for d_index,d_link in enumerate(d_links[1:]):
            d_element = d_link.find_element_by_xpath("td[2]/a")
            d_name = d_link.find_element_by_xpath("td[1]").text
            if d_name != "Download All Songs (Zip File)":
                driver.execute_script("arguments[0].click();", d_element)
            # if index ==0 and d_index ==1:
            #     print("Timesleep is running")
            #     time.sleep(20)
            #     print("Timesleep completed successfully")
            #     try:
            #         alert = driver.switch_to.alert
            #         alert.accept()  # Accept the alert
            #     except:
            #         pass
        time.sleep(1)
        
    except Exception as e:
        import sys
        print("An error occurred:", sys.exc_info()[1])
        print("error successfully")
        pass
    finally:
        print("finally successfully")
        pass

print("Timesleep completed successfully")
# time.sleep(2000)

driver.quit()