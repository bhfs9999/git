#coding=utf-8
import urllib
import urllib2

from bs4 import BeautifulSoup


def load(html):
    """
    读取html文件，加载为BeautifulSoup对象
    """
    #f = open(filename, 'r+')
    soup = BeautifulSoup(html, "lxml")
    return soup

# 保存数据到本地
def save(name, data):
    file = open(name, "wb+")
    for hospital in data:
        province = hospital[0].encode("utf-8")
        city = hospital[1].encode("utf-8")
        hos = hospital[2].encode("utf-8")
        aline = province + "\t" + city + "\t" + hos + "\n"
        file.write(aline)
    file.close()

def fetch_a_province(province_name, url):
    #获取对应省份的html页面
    print "fetching", province_name.center(40, "*")
    request = urllib2.Request(url)
    response = urllib2.urlopen(url)
    content = response.read()
    soup = load(content)

    province_list = []

    #提取城市列表
    city_list = soup.select(".tablist")
    for city in city_list:
        city_name = city.select("h4 > a")[1]["name"]
        hos_list = city.select("ul > li")

        for hos in hos_list:
            if hos.string == None:
                break
            hos_name = hos.string.strip()            
            province_list.append([province_name, city_name, hos_name])

    return province_list

def fetch_a_province_all(province_name, url):
    #获取对应省份的html页面
    print "fetching", province_name.center(40, "*")
    request = urllib2.Request(url)
    response = urllib2.urlopen(url)
    content = response.read()
    soup = load(content)

    province_list = []

    #提取城市列表
    city_list = soup.select(".tablist")
    for city in city_list:
        temp = city.select("h4")[0].contents[1]
        cut = temp.find('(')
        city_name =  temp[:cut]
        hos_list = city.select("ul > li")

        for hos in hos_list:
            hos = hos.select("a")
            if hos:
                hos_name = hos[0]["title"].strip()       
                province_list.append([province_name, city_name, hos_name])

            else:
                break           

    return province_list

#爬取数据
def fetch_3jia(soup):
    index_url = "http://yyk.99.com.cn"
    data_list = []
    #获取一级地区名，省份
    province_list = soup.select(".fontlist > ul > li > a")
    
    for province in province_list:
        province_name = province.string.strip()
        url = index_url + province['href']
        result = fetch_a_province(province_name, url)
        data_list += result

    return data_list

def fetch_all(soup):
    index_url = "http://yyk.99.com.cn"
    data_list = []
    #获取一级地区名，省份
    province_list = soup.select(".fontlist > ul > li > a")
    
    for province in province_list:
        province_name = province.string.strip()
        suburl = province['href']
        suburl = suburl[7:]
        url = index_url + suburl
        result = fetch_a_province_all(province_name, url)
        data_list += result

    return data_list
        

def run():
    url = "http://yyk.99.com.cn/sanjia/"
    request = urllib2.Request(url)
    response = urllib2.urlopen(url)
    content = response.read()

    soup = load(content)
    
    print "获取三甲医院名单"
    jia_hos = fetch_3jia(soup)
    save("3jia_hospital.txt", jia_hos)

    print "获取全部医院名单"
    all_hos = fetch_all(soup)
    save("all_hospital.txt", all_hos)

if __name__ =='__main__':
    run()
