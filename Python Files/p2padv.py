#!/usr/bin/env python
# coding: utf-8

# In[1]:


# import library
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
# get_ipython().run_line_magic('matplotlib', 'inline')
import seaborn as sns

from sklearn.metrics import confusion_matrix
from sklearn.metrics import classification_report
from sklearn.metrics import precision_recall_curve

# some other library are imported along with the code
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier

sns.despine(left=True, bottom=True)

# to avoid warnings
import warnings
warnings.filterwarnings('ignore')

# Pandas options
# pd.set_option('print.max_colwidth', 1000, 'print.max_rows', None, 'print.max_columns', None)


# In[2]:





# In[3]:


# load the data we saved from the first notebook part 1 
loans_2007_2019 = pd.read_csv('loans_2007_2019_cleaned.csv')

# view 1th rows
# print(loans_2007_2019.head(1))

print('The total number of rows and columns in our cleaned 2007 to 2019 loan data is: ',loans_2007_2019.shape)


# In[4]:


# read investment data made from part 1.
investment = pd.read_csv('investment.csv')
# add loan grade column
investment['loan_grade']=['A','B','C','D','E','F','G'] # since I saved the data as index=False, so i need to add it back.
# view the table
investment


# Note: From part 1, we have found the proportion of the loans between different grade are not the same, and I also mentioned that 'Charged-Off' rate does NOT mean the when the loans are charged off, investor will loss all the principal and interest, because loan payment schedul is a mortgage-like arrangement and a loan maybe charged off during the loan term. This can explain why the charged-off rate is even higher than interest rate except for A loans.
# 
# From first row, we can see if an investor put 25 dollar per loan and invest in 1000 loan, and ONLY choose A loans to invest, the average expected return is 7.1%, but if he/she lose all the money for the loans that are charged-off, the net return is: 0.071004-0.059498 = 1.5%. We can also calculate as following:

# In[5]:


# calculate the worst case for expected return 
((0.073353-0.059693)*25*1000)/(25*1000)


# In[6]:


def my_metric(model, X_test, y_test):
    
    # getting predicted values
    y_predict = model.predict(X_test)
    
    # False positives
    fp_filter = (y_predict == 1) & (y_test == 0)
    fp = len(y_predict[fp_filter])
    
    # True positives.
    tp_filter = (y_predict == 1) & (y_test == 1)
    tp = len(y_predict[tp_filter])
    
    # False negatives.
    fn_filter = (y_predict == 0) & (y_test == 1)
    fn = len(y_predict[fn_filter])
    
    # True negatives
    tn_filter = (y_predict == 0) & (y_test == 0)
    tn = len(y_predict[tn_filter])
    
    # Rates
    tpr = tp  / (tp + fn)
    fpr = fp  / (fp + tn)
    precision = tp/(tp+fp)
    
    print('Confusion matrix: \n', confusion_matrix(y_test, y_predict))
    # print(classification_report(y_test,y_predict)) # we don't need this
    print('The True Positive Rate (Recall/Sensitivity)is tpr = tp/(tp+fn): ', tpr)
    print('The False Positive Rate (1-specification)is fpr = fp/(fp+tn): ', fpr)
    print('The Precision (tp/(tp+fp)) is: ', precision)
    print('\n')


# In[7]:


def precision_recall_curves(model, X_test, y_test):
    
    # plot Precision Recall Curve
    plt.figure(figsize=(8,6))
    
    # predict probabilities
    probs = model.predict_proba(X_test)
    # keep probabilities for the positive outcome only
    probs = probs[:, 1]
    
    # get predicted class value
    y_predict = model.predict(X_test)
    
    # calculate precision-recall curve
    precision, recall, thresholds = precision_recall_curve(y_test, probs)
    
    # plot no skill
    plt.plot([0, 1], [0.8, 0.8], linestyle='--') 
    # plot the precision-recall curve for the model
    plt.plot(recall, precision, color='darkorange', marker='.')
    plt.xlabel('Recall (sensitivity, or True Positive Rate)')
    plt.ylabel('Precision')
    plt.title('Precision Recall Curve')
    
    return plt.show()


# In[8]:


def investment_return_with_my_model(model, X_test, y_test):
    
    # get predicted class value
    y_predict = model.predict(X_test)
    # reshape
    y_predict = y_predict.reshape((y_predict.shape[0], 1))
    # put it into a dataframe
    y_predict = pd.DataFrame(y_predict, index=range(0,len(y_predict)), columns=['loan_status_predicted'])
    
    # Join X_test and y_test using 'join' since they have the same index
    loans_test = X_test.join(y_test)
    
    # Then join the test dataframe with y_predict; Since it is different index, I created a 'Join' column and then use 'merge'
    loans_test['Join']=list(range(0,len(y_predict)))
    y_predict['Join']=list(range(0,len(y_predict)))
    # Merge test data with predicted data
    loans_test_with_predict = pd.merge(loans_test, y_predict, on='Join')
    
    # filter the rows that are predicted as 1
    predict_should_invest = loans_test_with_predict[loans_test_with_predict['loan_status_predicted']==1]
    
    # Among the loans predicted as 1, filter the rows thar are actually as 1
    actual_should_invest = predict_should_invest[predict_should_invest['loan_status']==1]
    
    # calculate the mistake rate, this is the same as fpr
    mistake_rate = (predict_should_invest.shape[0]-actual_should_invest.shape[0])/predict_should_invest.shape[0]
    
    # add a new column, indicating for each loan we invest 25 dollars
    predict_should_invest['invest_amount'] = 25
    
    # add a new column, calculating interest earned from this loan by multiplying interest rate per loan with the amount invested per loan
    predict_should_invest['interest_earned']=(predict_should_invest['int_rate']/100)*predict_should_invest['invest_amount']
    
    # sum the interest earned for all the loans we invested
    total_interest = predict_should_invest['interest_earned'].sum()
    
    # calculate our investment return
    investment_return = total_interest/(25*len(predict_should_invest))
    print('The investment return with this model is: ', '{:.2%}'.format(investment_return))
    
    # calculate the return for the worse case, meaning if we lost all the money from the loans that are charged-off
    #(including full amount of principal and interest, which is less likely), how much return we will get.
    investment_return_with_maxlosss = (total_interest-(mistake_rate*(25*len(predict_should_invest))))/(25*len(predict_should_invest))
    print('The investment return with this model for the worse case is: ', '{:.2%}'.format(investment_return_with_maxlosss))
    print('\n')
    print(predict_should_invest.head())


# In[9]:


print(loans_2007_2019.head(1))


# In[10]:


# select object columns
object_columns = loans_2007_2019.select_dtypes(include=["object"])

object_columns.head(1)


# In[11]:


# Encode object columns to integer values and return a Dataframe containing the dummy columns.
dummy_df = pd.get_dummies(loans_2007_2019[object_columns.columns], drop_first=True)

# combine dummy column dataframe with original dataframe as column
loans_2007_2019 = pd.concat([loans_2007_2019, dummy_df], axis=1)

# drop original object columns
loans_2007_2019 = loans_2007_2019.drop(object_columns.columns, axis=1)

# review the result with 3 rows
print(loans_2007_2019.head(1))

print('The number of rows and columns in our machine learning model is : ', loans_2007_2019.shape)


# In[12]:


features = loans_2007_2019.drop('loan_status', axis=1)

target = loans_2007_2019['loan_status']

from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(features, target, test_size=0.3, random_state=42)


# In[13]:


# create our model
lr_mymodel_default = LogisticRegression().fit(X_train, y_train)
# use my function
my_metric(lr_mymodel_default, X_test, y_test)
investment_return_with_my_model(lr_mymodel_default, X_test, y_test)


# In[14]:


# creat model, set model parameter with balanced
lr_mymodel_balanced = LogisticRegression(class_weight='balanced').fit(X_train, y_train)
# use my function
my_metric(lr_mymodel_balanced, X_test, y_test)
investment_return_with_my_model(lr_mymodel_balanced, X_test, y_test)


# In[15]:


precision_recall_curves(lr_mymodel_balanced, X_test, y_test)


# In[16]:


# create model, with balanced 
rf_balanced = RandomForestClassifier(class_weight="balanced", random_state=1).fit(X_train, y_train)
# use my function
my_metric(rf_balanced, X_test, y_test)
investment_return_with_my_model(rf_balanced, X_test, y_test)


# In[17]:



# set model parameter with different penalty
for i in [6, 7, 8, 9, 10]:   
    # creat our model
    penalty = {0: i, 1: 1} 
    lrf_mymodel_penalty = LogisticRegression(class_weight=penalty).fit(X_train, y_train)
    # use my function
    my_metric(lrf_mymodel_penalty, X_test, y_test)  
    investment_return_with_my_model(lrf_mymodel_penalty, X_test, y_test)


# In[18]:


#Curve for the above model
precision_recall_curves(lrf_mymodel_penalty, X_test, y_test)


# In[ ]:




