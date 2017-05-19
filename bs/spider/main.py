#coding=utf-8
"""
Spider fecthing news from website
"""

import urllib
import urllib2

from bs4 import BeautifulSoup

def getsoup(html):
    """
    读取html文件，加载为BeautifulSoup对象
    """
    soup = BeautifulSoup(html, "lxml")
    return soup

url = {
    u'新闻': "http://news.163.com/special/0001386F/rank_news.html",
    u'娱乐': "http://news.163.com/special/0001386F/rank_ent.html",
    u'体育': "http://news.163.com/special/0001386F/rank_sports.html",
    u'财经': "http://money.163.com/special/002526BH/rank.html",
    u'科技': "http://news.163.com/special/0001386F/rank_tech.html",
    u'汽车': "http://news.163.com/special/0001386F/rank_auto.html",
    u'游戏': "http://news.163.com/special/0001386F/game_rank.html",
    u'旅游': "http://news.163.com/special/0001386F/rank_travel.html",
    u'教育': "http://news.163.com/special/0001386F/rank_edu.html"
}

def save(name, data):
    file = open(name, "wb+")
    file.write(data)
    file.close



def run():
    for column in url:
        print "正在抓取：", column, "新闻"
        request = urllib2.Request(url[column])
        response = urllib2.urlopen(url[column])
        content = response.read()
        
        soup = getsoup(content)
        print soup
        break

if __name__ =='__main__':
    run()
