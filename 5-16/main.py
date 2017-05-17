# -*- coding:UTF-8 -*-
#! /usr/bin/python

import jieba
import MySQLdb
import numpy as np
import pandas as pd
from sklearn.naive_bayes import MultinomialNB
#from sklearn import linear_model
from sklearn import neighbors
from sklearn import svm
#from sklearn import cross_validation
from sklearn.model_selection import cross_val_score



def check_number(str):
    temp = str.count('.')
    if temp < 1:
        return str.isdigit()
    elif temp == 1:
        str = str.split('.')
        return str[0].isdigit() and str[1].isdigit()
    else:
        return False


def calc_freq(wordlist):
    result = {}
    for word in wordlist:
        if word in result.keys():
            result[word] += 1
        else:
            result[word] = 1
    return result

def readData():
    cn = MySQLdb.connect(host='localhost', port=3306, user='root', passwd='mysql123456', db='wanfang', charset='utf8')
    #sql = 'select * from ophthalmology_pend_test;'
    # 使用utf-8编码读取数据库，读进来的数据是unicode
    #pendata = pd.read_sql(sql, con=cn)
    sql = 'select * from ophthalmology_train2;'
    traindata = pd.read_sql(sql, con=cn)
    cn.close()
    return traindata

def makeStopWordSet():
    wordSet = set()
    with open('stopwords_cn.txt', 'r') as fp:
        for line in fp.readlines():
            word = line.strip().decode('utf-8')
            if len(word) > 0 and word not in wordSet:
                wordSet.add(word)
    return wordSet

def trainDataProcessing(trainData):
    dataList = []
    classList = []

    for i in range(0, trainData.shape[0], 1):
        wordsList = []
        abstract = trainData.loc[i, 'des']
        title = trainData.loc[i, 'title']
        keyword = trainData.loc[i, 'keyword']
        eyedis = trainData.loc[i, 'eyedis']

        wordCut = jieba.cut(abstract, cut_all=False)
        # genertor转化为list，每个词unicode格式
        wordsList += list(wordCut)

        wordCut = jieba.cut(title, cut_all=False)
        wordsList += list(wordCut) * 3

        wordCut = jieba.cut(keyword, cut_all=False)
        wordsList += list(wordCut) * 2
        wordsList = calc_freq(wordsList)
        dataList.append(wordsList)

        classList.append(eyedis)

    # 统计词频放入all_words_dict
    allWordsDict = {}
    for wordList in dataList:
        for word in wordList:
            if not check_number(word):
                if allWordsDict.has_key(word):
                    allWordsDict[word] += wordList[word]
                else:
                    allWordsDict[word] = wordList[word]
    # key函数利用词频进行降序排序
    # 内建函数sorted参数需为list
    allWordsTupleList = sorted(allWordsDict.items(), key=lambda f:f[1], reverse=True)
    #allWordsList = list(zip(*allWordsTupleList))
    #print allWordsList

    return allWordsTupleList, dataList, classList

def testDataProcessing(testData):
    dataList = []

    for i in range(0, testData.shape[0], 1):
        wordsList = []
        abstract = testData.loc[i, 'des']
        title = testData.loc[i, 'title']
        keyword = testData.loc[i, 'keyword']

        wordCut = jieba.cut(abstract, cut_all=False)
        # genertor转化为list，每个词unicode格式
        wordsList += list(wordCut)

        wordCut = jieba.cut(title, cut_all=False)
        wordsList += list(wordCut) * 3

        wordCut = jieba.cut(keyword, cut_all=False)
        wordsList += list(wordCut) * 2
        wordsList = calc_freq(wordsList)
        dataList.append(wordsList)

    return dataList

# 选取特征词
def wordsPick_freq(allWordsList, deleteN, stopWordsSet):
    featureWords = []
    n = 1

    for t in range(deleteN, len(allWordsList), 1):
        if n > 2000:
            break
        if not allWordsList[t][0].isdigit() and allWordsList[t][1]>6 and allWordsList[t][0] not in stopWordsSet and len(allWordsList[t][0]) > 1:
            featureWords.append(allWordsList[t][0])
            n += 1
    return featureWords

def wordsPick(allWordsList, deleteN, stopWordsSet):
    featureWords = []
    n = 1
    # 前n个单词去掉
    for t in range(deleteN, len(allWordsList), 1):
        if n > 3000:
            break
        if not allWordsList[t].isdigit() and allWordsList[t] not in stopWordsSet and len(allWordsList[t]) > 1:
            featureWords.append(allWordsList[t])
            n += 1
    return featureWords


def textFeatures(trainDataList, testDataList, featureWords):
    def getFeatures(text, featureWords):
        #textSet = set(text)
        features = [text[word] if word in text else 0 for word in featureWords]
        return features
    
    trainFeaturesList = [getFeatures(text, featureWords) for text in trainDataList]
    #testFeaturesList = [getFeatures(text, featureWords) for text in testDataList]

    return trainFeaturesList,0#, testFeaturesList

def textClassifier(trainFeaturesList, testFeaturesList, trainClassList):
    result_array = []
    # classifier = MultinomialNB().fit(trainFeaturesList, trainClassList)
    # result_nb = classifier.predict(testFeaturesList)
    # classifier = neighbors.KNeighborsClassifier(algorithm='kd_tree').fit(trainFeaturesList, trainClassList)
    # result_knn = classifier.predict(testFeaturesList)
    #classifier = svm.SVC().fit(trainFeaturesList, trainClassList)
    clf = svm.SVC(kernel='linear', C=1)
    scores = cross_val_score(clf, trainFeaturesList,trainClassList, cv=10)
    print scores

def testDataMatch(testData, result):
    total = 0
    count = 0
    for i in range(0, testData.shape[0], 1):
        if testData.loc[i, 'eyedis'] == result[i]:
            count += 1
            total += 1
        else:
            print testData.loc[i,'index'],testData.loc[i,'eyedis'],result[i]
            total += 1
    #print count, total
    print count * 1.0/total

if __name__ =='__main__':
    print '----------prepare stop-words----------'
    stopWordsSet = makeStopWordSet()
    print '----------read database----------'
    trainData= readData()
    length = len(trainData)
    print '----------process trainData----------'
    allWordsList, trainDataList, trainClassList = trainDataProcessing(trainData)

    #print '----------process testData----------'
    #testDataList = testDataProcessing(testData)
    print '----------prepare feature-words----------'
    for i in range(0,1):
        print "delete number",i
        featureWords = wordsPick_freq(allWordsList, i, stopWordsSet)
        #print '----------get feature text----------'
        testDataList = 0
        trainFeaturesList, testFeaturesList = textFeatures(trainDataList, testDataList, featureWords)
        #print trainFeaturesList
        #print '----------classify the testData----------'
        result = textClassifier(trainFeaturesList, testFeaturesList, trainClassList)
        #print '----------get result----------'
        #testDataMatch(testData, result)