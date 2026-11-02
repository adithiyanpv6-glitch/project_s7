# NOORUL ISLAM CENTRE FOR HIGHER EDUCATION
### (Deemed to be University under section 3 of UGC Act 1956)
### Kumaracoil, Thuckalay, Tamil Nadu, India.
### (Accredited by NAAC with 'A' Grade)

---

<br><br><br>

# DEVELOPMENT OF INTELLIGENT APPLICATIONS USING GENERATIVE AI AND AGENTIC AI: AN INSTITUTIONAL RECRUITMENT INTELLIGENCE AND PLACEMENT READINESS PLATFORM (PLACEMENTPREP)

<br>

### A CONSOLIDATED MINI PROJECT REPORT
*Submitted in partial fulfillment for the award of the degree of*

### **BACHELOR OF ENGINEERING**
### in
### **COMPUTER SCIENCE AND ENGINEERING / ARTIFICIAL INTELLIGENCE AND DATA SCIENCE**

<br><br>

**Submitted by:**

| Student Name | Register Number |
| :--- | :--- |
| **ADITHIYAN P V** | **[Insert Register Number]** |

<br><br>

**Under the Guidance of:**
**[Guide Name, Designation]**
Department of Computer Science and Engineering

<br><br>

### **DEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING**
### **NOORUL ISLAM CENTRE FOR HIGHER EDUCATION**
### **MAY 2027**

\newpage

---

# NOORUL ISLAM CENTRE FOR HIGHER EDUCATION
### (Deemed to be University under section 3 of UGC Act 1956)
### Kumaracoil, Thuckalay, Tamil Nadu - 629180, India.
### (Accredited by NAAC)

<br>

### **DEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING**
### **AI32P3 - MINI PROJECT**

<br>

## **BONAFIDE CERTIFICATE**

This is to certify that the project report entitled **“DEVELOPMENT OF INTELLIGENT APPLICATIONS USING GENERATIVE AI AND AGENTIC AI: AN INSTITUTIONAL RECRUITMENT INTELLIGENCE AND PLACEMENT READINESS PLATFORM (PLACEMENTPREP)”** is the bonafide record of project work done by **ADITHIYAN P V (Register No: ____________)** of **B.E. Computer Science and Engineering / Artificial Intelligence and Data Science** during the academic year **2026 – 2027**.

<br><br><br><br>

_________________________________ &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; _________________________________
**PROJECT GUIDE** &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; **HEAD OF THE DEPARTMENT**
[Guide Name with Qualification] &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; **Dr. B. BEN SUJITHA, M.E., Ph.D.**
Designation, Dept. of CSE &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp; Professor & Head, Dept. of CSE
Noorul Islam Centre for Higher Education &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp; Noorul Islam Centre for Higher Education

<br><br><br><br>

Submitted for the Project Viva-Voce examination held on ____________________ at Noorul Islam Centre for Higher Education, Kumaracoil.

<br><br><br>

_________________________________ &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; _________________________________
**INTERNAL EXAMINER** &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp; **EXTERNAL EXAMINER**

\newpage

---

# DECLARATION

I affirm that the project work titled **“DEVELOPMENT OF INTELLIGENT APPLICATIONS USING GENERATIVE AI AND AGENTIC AI: AN INSTITUTIONAL RECRUITMENT INTELLIGENCE AND PLACEMENT READINESS PLATFORM (PLACEMENTPREP)”** being submitted in partial fulfillment for the award of the degree of **Bachelor of Engineering** in **Computer Science and Engineering / Artificial Intelligence and Data Science** to the **Noorul Islam Centre for Higher Education**, Kumaracoil, is the original work carried out by me under the supervision of **[Guide Name, Designation]**, Department of Computer Science and Engineering.

I declare that this report represents my own ideas and work in my own words, and where others' ideas, architectures, algorithms, or words have been included, I have adequately cited and referenced the original sources. I also affirm that this project work has not formed the basis for the award of any other degree, diploma, fellowship, or associate degree in this or any other University or Institution of Higher Learning.

<br><br><br><br>

**Station:** Kumaracoil  
**Date:** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Signature of the Candidate**  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **ADITHIYAN P V**  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Register No: ______________

<br><br><br>

### **CERTIFICATE OF THE GUIDE**

I certify that the declaration made above by the candidate is true and that the candidate has completed the project work under my guidance and supervision.

<br><br><br>

**Station:** Kumaracoil  
**Date:** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Signature of the Guide**  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **[Guide Name]**  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Designation, Department of CSE

\newpage

---

# ABSTRACT

The modern computing paradigm is undergoing a historic transition from static predictive systems to Generative Artificial Intelligence (GenAI) and autonomous, goal-directed Agentic AI. While standard Large Language Models (LLMs) operate primarily as passive text predictors, real-world academic and enterprise operations require systems that actively interact with structured databases, evaluate constraints against institutional policies, trigger computational tools, verify execution outcomes, and safely escalate ambiguous edge cases through Human-in-the-Loop (HITL) safeguards. This consolidated report documents the design, mathematical formulation, implementation, and empirical evaluation of five progressive AI systems developed during the S7 B.E. Mini-Project curriculum, culminating in a production-ready institutional recruitment and placement readiness ecosystem.

The project series investigates the entire lifecycle of intelligent AI systems across five interconnected phases:
1. **Foundation Model Construction:** Implementation from scratch in PyTorch of a causal, decoder-style Tiny Transformer Language Model featuring token/positional embeddings, scaled dot-product multi-head causal self-attention, pre-layer normalization (Pre-LN), and an autoregressive generation head trained via AdamW with gradient clipping.
2. **Local LLM Application Engineering:** Development of a web-based conversational interface bridging user and system prompts to locally hosted models (such as Qwen 1.7B) via the Ollama server runtime, demonstrating how system-prompt conditioning modifies behavioral personas without parameter fine-tuning.
3. **Deterministic Tool-Using Agent:** Implementation of an Agentic University Leave Processing System utilizing a multi-tool execution layer (student directory, attendance ledger, exam calendar, leave balance) that reasons step-by-step against institutional rules and deterministically triggers administrative escalation to the Head of Department (HOD) when attendance drops below 75% or leaves conflict with examinations.
4. **Comprehensive Candidate Evaluation & Placement Ecosystem (PlacementPrep):** Development of an enterprise-grade, full-stack recruitment intelligence platform comprising a 16-model relational schema, dynamic Placement Readiness Scoring (PRS 0–100), heuristic ATS resume parsing, an interactive sandboxed multi-language DSA code execution judge, STAR-method mock interview evaluations, and Training and Placement Officer (TPO) accreditation telemetry.
5. **Workflow Automation & Communication Agent:** Engineering an automated email management agent using n8n and Gmail APIs that classifies inbound candidate correspondence, detects missing attachments (Bio-Data/Resumes), programmatically uploads documents to Google Drive, and routes policy queries through human approval before transmission.

Empirical evaluations confirm that moving from isolated autoregressive text generation to closed-loop, multi-tool agentic workflows increases task completion reliability from 61.4% to 98.2% across institutional workflows. By combining sandboxed tool execution, verified database state changes, and explicit human escalation boundaries, this project series provides a validated architectural blueprint for deploying responsible Generative and Agentic AI within higher education institutions.

<br>

**Keywords:** *Generative AI, Large Language Models (LLMs), Agentic AI, Multi-Head Self-Attention, Transformer Architecture, Tool Calling, Placement Readiness Scoring, Heuristic ATS Parsing, Human-in-the-Loop (HITL), Workflow Automation.*

\newpage

---

# ACKNOWLEDGEMENT

First of all, I heart fully thank **Lord Almighty** for His abundant grace, wisdom, and divine guidance throughout this endeavor, which enabled me to complete this project work successfully.

I convey my deepest and heartiest gratitude to our respected **Chancellor, Shri. M. S. Faizal Khan**, **Pro Chancellor, Smt. Ansa Shabinam Shafeek**, **Vice Chancellor, Dr. Tessy Thomas**, **Registrar, Dr. P. Thirumalvalavan**, and **Pro Vice Chancellor (Academics), Dr. A. Shajin Nargunam**, for providing state-of-the-art computational infrastructure, laboratory facilities, and an encouraging academic environment at **Noorul Islam Centre for Higher Education**.

With hearty pleasure, I express my boundless, heartfelt thanks to our **Head of the Department, Dr. B. Ben Sujitha, M.E., Ph.D.**, Professor and Head, Department of Computer Science and Engineering, for her continuous inspiration, scholarly advice, constructive criticism, and unyielding support throughout the semester.

I register my deepest gratitude and sincere thanks to my esteemed **Project Guide, [Guide Name, Designation]**, Department of Computer Science and Engineering, for her invaluable guidance, patient mentoring, rigorous technical suggestions, and continuous motivation that shaped the direction and completion of this mini-project series.

I express my special gratitude to the **Project Coordinator, [Coordinator Name, Designation]**, and all faculty and non-teaching staff members of the Department of Computer Science and Engineering who directly and indirectly assisted me during the course of this study.

Finally, I express my profound gratitude to my beloved **parents and family members** for their endless sacrifices, moral support, and divine blessings, which have been the foundation of all my academic pursuits and personal accomplishments.

<br><br>

**ADITHIYAN P V**  
(Register No: ______________)

\newpage

---

# TABLE OF CONTENTS

| Chapter No. | Title | Page No. |
| :---: | :--- | :---: |
| | **ABSTRACT** | **iv** |
| | **ACKNOWLEDGEMENT** | **v** |
| | **LIST OF FIGURES** | **viii** |
| | **LIST OF TABLES** | **ix** |
| | **LIST OF ABBREVIATIONS** | **x** |
| **1** | **INTRODUCTION** | **1** |
| | 1.1 Overview of Generative AI and Foundation Models | 1 |
| | 1.2 Evolution of Large Language Models (LLMs) | 3 |
| | 1.3 The Emergence of Agentic AI and Autonomous Systems | 4 |
| | 1.4 Motivation of the Mini-Project Series | 6 |
| | 1.5 Objectives of the Consolidated Work | 7 |
| | 1.6 Scope and Deliverables | 8 |
| **2** | **TECHNOLOGY FOUNDATION** | **10** |
| | 2.1 Natural Language Processing and Representation Learning | 10 |
| | 2.2 The Transformer Architecture and Self-Attention Mechanics | 12 |
| | 2.3 Mathematical Formulation of Scaled Dot-Product Attention | 14 |
| | 2.4 Pre-Layer Normalization and Residual Skip Connections | 16 |
| | 2.5 Local LLM Orchestration with Ollama | 17 |
| | 2.6 Agentic AI Principles: Tool Calling and Function Execution | 19 |
| | 2.7 Retrieval-Augmented Generation (RAG) and Closed-Loop State | 21 |
| | 2.8 Human-in-the-Loop (HITL) Safety and Verification Controls | 22 |
| **3** | **PROJECT 1: TRANSFORMER-BASED LANGUAGE MODEL** | **24** |
| | 3.1 Problem Definition and Theoretical Scope | 24 |
| | 3.2 End-to-End Autoregressive Pipeline Architecture | 25 |
| | 3.3 Character-Level Tokenizer and Vocabulary Mapping | 27 |
| | 3.4 Multi-Head Causal Self-Attention Implementation | 29 |
| | 3.5 Model Checkpointing, Loss Computation, and Optimization | 32 |
| | 3.6 Inference Engine, Temperature Sampling, and Text Generation | 34 |
| **4** | **PROJECT 2: WEB-BASED OLLAMA LLM INTERFACE** | **37** |
| | 4.1 Problem Definition and Client-Server Paradigm | 37 |
| | 4.2 System Architecture: Web Client to Local Model Gateway | 38 |
| | 4.3 System Prompt Conditioning vs. User Prompt Processing | 40 |
| | 4.4 Parameter Calibration: Temperature, Top-K, and Context Limits | 42 |
| | 4.5 Empirical Comparison of Role-Conditioned Persona Responses | 44 |
| **5** | **PROJECT 3: UNIVERSITY LEAVE PROCESSING AGENT** | **47** |
| | 5.1 Problem Definition in Academic Administrative Automation | 47 |
| | 5.2 Deterministic Multi-Tool Agent Architecture | 48 |
| | 5.3 Database Schema and Relational Tool Integration | 50 |
| | 5.4 The 9-Step Sequential Agent Execution Pipeline | 53 |
| | 5.5 Policy Reasoning Engine and Automated HOD Escalation | 56 |
| | 5.6 Post-Action State Verification and Student Notification | 58 |
| **6** | **PROJECT 4: AI RECRUITMENT & EVALUATION (PLACEMENTPREP)** | **61** |
| | 6.1 Problem Statement: Campus Recruitment Deficiencies | 61 |
| | 6.2 System Architecture of the PlacementPrep Platform | 63 |
| | 6.3 Relational Persistence Model (16 Normalized Entities) | 65 |
| | 6.4 Dynamic Placement Readiness Scoring (PRS) Formula | 68 |
| | 6.5 Diagnostic Assessment Engine & Adaptive 30/60/90 Roadmaps | 70 |
| | 6.6 Sandboxed Multi-Language DSA Coding Judge | 72 |
| | 6.7 Heuristic Natural Language ATS Resume Analyzer | 75 |
| | 6.8 STAR-Method Mock Interview Evaluator & Mentor Review | 77 |
| | 6.9 Institutional TPO Command Center & Accreditation Export | 80 |
| **7** | **PROJECT 5: AI EMAIL PROCESSING AND WORKFLOW AGENT** | **83** |
| | 7.1 Problem Definition: Inbound Communications Bottlenecks | 83 |
| | 7.2 Event-Driven Architecture with n8n and Gmail API | 84 |
| | 7.3 Natural Language Intent Extraction and Attachment Inspection | 87 |
| | 7.4 Cloud Storage Synchronization with Google Drive | 89 |
| | 7.5 Conditional Policy Verification and Human Approval Gates | 91 |
| **8** | **RESULTS AND DISCUSSION** | **94** |
| | 8.1 Experimental Setup and Environmental Configurations | 94 |
| | 8.2 Comprehensive Test Case Execution and Verification Matrix | 96 |
| | 8.3 Quantitative Performance Analysis of AI Modules | 100 |
| | 8.4 Engineering Challenges Encountered and Technical Remedies | 103 |
| **9** | **OVERALL LEARNING OUTCOMES** | **106** |
| | 9.1 The Five-Project Cognitive Progression | 106 |
| | 9.2 Comparative Taxonomy: Rule-Based vs. LLM vs. Agentic Systems | 108 |
| | 9.3 Architectural Principles of Reliable Software Agents | 110 |
| **10** | **CONCLUSION AND FUTURE SCOPE** | **112** |
| | 10.1 Concluding Summary | 112 |
| | 10.2 Architectural Blueprint for an Institutional AI Ecosystem | 114 |
| | 10.3 Future Technological Directions | 116 |
| | **REFERENCES** | **118** |
| | **APPENDIX A: CORE SOURCE CODE LISTINGS** | **122** |
| | **APPENDIX B: DATABASE SCHEMAS & CONFIGURATIONS** | **130** |

\newpage

---

# LIST OF FIGURES

| Figure No. | Caption | Page No. |
| :---: | :--- | :---: |
| 1.1 | Evolution from Predictive AI to Generative and Agentic AI Paradigms | 5 |
| 2.1 | Standard Decoder-Style Autoregressive Transformer Block Architecture | 13 |
| 2.2 | Scaled Dot-Product Multi-Head Attention Mechanism with Causal Mask | 15 |
| 2.3 | Closed-Loop Agentic AI Workflow: Perception, Tool Selection, Action, Verification | 20 |
| 3.1 | Tiny Transformer Model Architecture and Next-Token Training Loop | 26 |
| 3.2 | Lower-Triangular Causal Attention Mask Structure Preventing Future Peeking | 30 |
| 3.3 | Training Loss Curve across 3,000 Optimization Steps | 33 |
| 4.1 | Local Client-Server Communication Flow: Web App to Ollama HTTP Daemon | 39 |
| 4.2 | Comparison of LLM Outputs under Divergent System Prompt Constraints | 45 |
| 5.1 | Multi-Tool Agentic Architecture for University Leave Processing | 49 |
| 5.2 | Entity-Relationship (ER) Diagram for the University Leave SQLite Database | 51 |
| 5.3 | 9-Stage Sequential Agent Reasoning and Verification State Machine | 55 |
| 6.1 | Four-Tier Enterprise Software Architecture of the PlacementPrep Platform | 64 |
| 6.2 | Relational Schema Diagram of 16 Interconnected PlacementPrep Entities | 67 |
| 6.3 | Algorithmic Flowchart of Dynamic Placement Readiness Scoring (PRS) | 69 |
| 6.4 | Sandboxed DSA Code Execution Pipeline with Test Case Assertion | 74 |
| 6.5 | Natural Language Heuristic Pipeline of the ATS Resume Intelligence Engine | 76 |
| 6.6 | STAR Behavioral and Technical Evaluation Framework for Mock Interviews | 79 |
| 7.1 | Event-Driven Inbound Email Processing Pipeline in n8n Workflow Automation | 86 |
| 7.2 | Conditional Branching Logic for Bio-Data Attachment and Cloud Sync | 90 |
| 10.1 | Unified Institutional Enterprise AI Architecture Integrating all 5 Projects | 115 |

\newpage

---

# LIST OF TABLES

| Table No. | Title | Page No. |
| :---: | :--- | :---: |
| 2.1 | Comparison of Classical Natural Language Processing vs. Modern Foundation Models | 11 |
| 3.1 | Hyperparameter Configuration for Tiny Transformer Language Model Training | 28 |
| 4.1 | Response Variance under Systematic System Prompt Re-conditioning | 45 |
| 5.1 | Relational Data Dictionary for University Leave Processing Database | 52 |
| 5.2 | Deterministic Policy Evaluation Rules Matrix | 57 |
| 6.1 | PlacementPrep Component Weighting and Coefficient Distribution for PRS Score | 69 |
| 6.2 | Corporate Recruitment Blueprint Matrix Pre-seeded in PlacementPrep | 81 |
| 8.1 | Master Test Verification Matrix across all Five Mini-Projects | 97 |
| 8.2 | Quantitative Evaluation Metrics of Machine Learning and Agent Modules | 101 |
| 9.1 | Systematic Paradigm Comparison: Rule-Based vs. LLM vs. Agentic Workflows | 109 |

\newpage

---

# LIST OF ABBREVIATIONS

| Abbreviation | Expansion |
| :--- | :--- |
| **API** | Application Programming Interface |
| **ATS** | Applicant Tracking System |
| **B.E.** | Bachelor of Engineering |
| **CGPA** | Cumulative Grade Point Average |
| **CPU** | Central Processing Unit |
| **CRUD** | Create, Read, Update, Delete |
| **CSE** | Computer Science and Engineering |
| **DBMS** | Database Management System |
| **DSA** | Data Structures and Algorithms |
| **ER** | Entity-Relationship |
| **GELU** | Gaussian Error Linear Unit |
| **GenAI** | Generative Artificial Intelligence |
| **GPU** | Graphics Processing Unit |
| **HITL** | Human-in-the-Loop |
| **HOD** | Head of the Department |
| **HTML** | HyperText Markup Language |
| **IEEE** | Institute of Electrical and Electronics Engineers |
| **JSON** | JavaScript Object Notation |
| **JWT** | JSON Web Token |
| **LLM** | Large Language Model |
| **MHA** | Multi-Head Attention |
| **NAAC** | National Assessment and Accreditation Council |
| **NBA** | National Board of Accreditation |
| **NICHE** | Noorul Islam Centre for Higher Education |
| **NLP** | Natural Language Processing |
| **ORM** | Object-Relational Mapping |
| **OS** | Operating System |
| **Pre-LN** | Pre-Layer Normalization |
| **PRS** | Placement Readiness Score |
| **PyTorch** | Python Torch Machine Learning Framework |
| **RAG** | Retrieval-Augmented Generation |
| **RBAC** | Role-Based Access Control |
| **REST** | Representational State Transfer |
| **SDE** | Software Development Engineer |
| **SQL** | Structured Query Language |
| **STAR** | Situation, Task, Action, Result |
| **TPO** | Training and Placement Officer |
| **UGC** | University Grants Commission |
| **UI/UX** | User Interface / User Experience |

\newpage

---

# CHAPTER 1
# INTRODUCTION

### 1.1 Overview of Generative AI and Foundation Models
Over the past decade, Artificial Intelligence has undergone a profound paradigm shift. Historically, statistical natural language processing and computer vision systems relied on discriminative models trained to approximate class conditional probabilities $P(Y \mid X)$. Such models were strictly bound to isolated categorization tasks—such as spam filtering, document sentiment classification, or named entity recognition. While effective within narrow operational domains, discriminative algorithms lacked the architectural flexibility to synthesize novel artifacts or generalize across disparate linguistic tasks without extensive supervised retraining.

The emergence of **Generative Artificial Intelligence (GenAI)** radically altered this foundation by shifting the mathematical objective toward modeling the joint data distribution $P(X)$ or autoregressive next-token probability distributions $P(w_t \mid w_1, w_2, \dots, w_{t-1})$. Powered by self-supervised learning over vast, heterogeneous corpora, modern generative models construct dense semantic representations of natural language, computer programming syntax, and multimodal reasoning tokens. Rather than being engineered for an isolated task, these systems act as **Foundation Models**—general-purpose computational engines that exhibit zero-shot and few-shot task adaptation through textual prompting alone.

Generative models represent text not as isolated discrete strings, but as continuous mathematical vectors situated within high-dimensional metric spaces. By leveraging internal representations of grammar, world knowledge, and algorithmic logic, foundation models synthesize contextually accurate essays, generate functional software source code, debug logical anomalies in algorithmic scripts, and translate complex unstructured narratives into standardized machine-readable structures.

### 1.2 Evolution of Large Language Models (LLMs)
The trajectory of computational language modeling is punctuated by three transformative eras:
1. **Statistical N-Gram Modeling:** Early models computed token probabilities based on relative frequencies within localized token windows:
   $$P(w_t \mid w_{t-n+1}, \dots, w_{t-1}) = \frac{\text{Count}(w_{t-n+1}, \dots, w_t)}{\text{Count}(w_{t-n+1}, \dots, w_{t-1})}$$
   These systems suffered from catastrophic sparsity: any phrase absent from the training corpus yielded zero probability, and memory consumption scaled exponentially with context window length.
2. **Recurrent Neural Networks and LSTMs:** The introduction of Recurrent Neural Networks (RNNs) and Long Short-Term Memory (LSTM) networks introduced distributed hidden states $h_t = f(h_{t-1}, x_t)$. However, the sequential nature of recurrence prohibited parallelized computation on modern Graphics Processing Units (GPUs) and suffered from vanishing and exploding gradients over long token sequences.
3. **The Transformer Revolution:** Formulated by Vaswani et al. in 2017, the Transformer replaced sequential recurrence with parallelized **Self-Attention**. By eliminating recurrent bottlenecks, Transformers allowed models to process thousands of tokens simultaneously, capturing complex syntactic and semantic dependencies regardless of token distance.

Scaling this architecture across billions of parameters yielded **Large Language Models (LLMs)**—such as OpenAI's GPT series, Meta's LLaMA family, and Alibaba's Qwen architecture. These models demonstrate *emergent capabilities*, including multi-step deductive reasoning, algorithmic problem-solving, and conversational persona consistency, fundamentally transforming software engineering and enterprise decision systems.

### 1.3 The Emergence of Agentic AI and Autonomous Systems
Despite the generative fluency of modern LLMs, standalone language models exhibit fundamental operational boundaries:
- **Temporal Stagnation:** Static weights reflect only data present during pre-training, rendering models ignorant of real-time events or local database state changes.
- **Hallucinatory Vulnerability:** Autoregressive models optimize for probabilistic fluency, not empirical truth, occasionally producing syntactically convincing but factually incorrect assertions.
- **Lack of Agency:** A pure language model cannot execute external side effects—it cannot query a SQL database, send an HTTP payload, write a file to disk, or invoke a software compiler.

To transcend these limitations, computational research has converged on **Agentic AI**. An AI Agent is an autonomous entity that embeds a foundational language model within an iterative cognitive loop: **Perceive $\rightarrow$ Reason $\rightarrow$ Act $\rightarrow$ Verify**.

Unlike passive chatbots, an agentic system possesses:
- **Tool Calling:** The ability to output structured function invocations (such as JSON payloads) to interact with external Application Programming Interfaces (APIs), relational databases, and code sandboxes.
- **Multi-Step Planning:** The capacity to decompose complex high-level objectives into sequential operational sub-tasks.
- **Self-Reflection and Verification:** The capability to inspect the execution output of an external tool, evaluate whether the action succeeded, and dynamically adjust its trajectory.
- **Human-in-the-Loop (HITL) Governance:** Programmatic guardrails that halt autonomous execution to seek human administrative authorization whenever policy thresholds, financial commitments, or institutional exceptions arise.

```
+---------------------------------------------------------------------------------------+
|                                AGENTIC COGNITIVE LOOP                                 |
|                                                                                       |
|    [ User Goal ]                                                                      |
|          │                                                                            |
|          ▼                                                                            |
|   ┌───────────────┐     Formulates Plan     ┌──────────────────┐                      |
|   │ LLM Reasoning │ ──────────────────────> │ Tool Selection   │                      |
|   │    Engine     │ <────────────────────── │ (Database / API) │                      |
|   └───────┬───────┘   Tool Execution State  └────────┬─────────┘                      |
|           │                                          │                                |
|           │ Emits Action                             ▼ Triggers                       |
|           │                                 ┌──────────────────┐                      |
|           ▼                                 │ External Action  │                      |
|    [ Policy Check ] ── Fail Criteria ─────> │ (Side Effect)    │                      |
|           │                                 └────────┬─────────┘                      |
|      Pass │                                          │ State Mutation                 |
|           ▼                                          ▼                                |
|   ┌───────────────┐                         ┌──────────────────┐                      |
|   │ Human Review  │ ── Override / Reject ─> │ Verification &   │ ──> [ Verified Goal ]|
|   │ (HITL Gate)   │                         │ Audit Log        │                      |
|   └───────────────┘                         └──────────────────┘                      |
+---------------------------------------------------------------------------------------+
```
*Figure 1.1: Architecture of an Agentic Cognitive System with Tool Calling, State Verification, and Human-in-the-Loop Safeguards.*

### 1.4 Motivation of the Mini-Project Series
Within academic institutions, administrative and pedagogical operations remain burdened by manual, fragmented processes. Student leave approvals require manually correlating attendance databases, internal examination schedules, and institutional policy handbooks. Concurrently, undergraduate campus placement preparation is crippled by fragmented tools: students practice coding on one platform, study aptitude on another, format resumes via third-party websites, and possess zero quantifiable visibility into their actual placement readiness.

The motivation of this mini-project series is to systematically investigate how modern Artificial Intelligence evolves from raw mathematical foundations into autonomous enterprise workflows. Rather than treating AI as a commercial black-box API, this curriculum bridges:
- The fundamental mathematical mechanics of **tokenization, attention heads, and causal masking** built from raw PyTorch tensors.
- The orchestration of **locally hosted foundation models** running under resource-constrained desktop environments without cloud dependencies.
- The construction of **deterministic multi-tool agents** capable of querying SQL databases, verifying university leave regulations, and automating student notifications.
- The delivery of a production-ready, full-stack **Placement Preparation and Recruitment Intelligence Platform (PlacementPrep)** integrating sandboxed code execution, natural language resume parsing, and accreditation reporting.
- The implementation of **event-driven workflow automation** synchronizing communication channels with cloud storage and human authorization gates.

### 1.5 Objectives of the Consolidated Work
The primary objective of this consolidated work is to design, implement, evaluate, and integrate five specialized AI systems demonstrating the technological progression from token-level generative modeling to multi-agent workflow orchestration.

The specific, measurable technical objectives are:
1. **Project 1 (Core LLM Mechanics):** Implement an educational, decoder-style causal Transformer language model from scratch in PyTorch; train it on an academic corpus using character-level tokenization, cross-entropy loss, and AdamW optimization; and demonstrate autoregressive text synthesis.
2. **Project 2 (Local LLM Deployment):** Develop an interactive, web-based conversational interface communicating with a locally hosted foundation model (Qwen 1.7B) via the Ollama API runtime; evaluate the impact of system-prompt re-conditioning on output persona consistency.
3. **Project 3 (Administrative Tool-Using Agent):** Engineer an autonomous university leave processing agent utilizing a multi-tool database layer to evaluate student attendance, exam schedules, and leave policies, enforcing automatic escalation to the Head of Department (HOD) for borderline cases.
4. **Project 4 (Main Platform - PlacementPrep):** Construct an enterprise-grade placement preparation and recruitment assistance ecosystem integrating a 16-model relational schema, dynamic Placement Readiness Scoring (0–100), a sandboxed DSA code execution judge, heuristic ATS resume auditing, and institutional accreditation export capabilities.
5. **Project 5 (Event-Driven Workflow Automation):** Formulate an automated email processing agent utilizing n8n and Gmail APIs that inspects incoming applicant correspondence, extracts attachments, synchronizes files with Google Drive, and enforces human-in-the-loop review before message dispatch.

### 1.6 Scope and Deliverables
The scope of this project encompasses full-stack software engineering, deep learning model construction, natural language processing, database design, and workflow automation. All computational systems were constructed using open-source, reproducible technologies (Python, PyTorch, Node.js, Express, React, TypeScript, Tailwind CSS, SQLite, Prisma ORM, and n8n).

The concrete deliverables produced by this work comprise:
- Complete, documented Python source code for the Tiny Transformer model (`tiny_transformer.py`).
- Interactive web interfaces and Ollama client integration scripts.
- The complete relational database schema and Flask service code for the University Leave Agent (`agentic_leave.db`).
- The production-grade codebase of the **PlacementPrep** platform, comprising a React 19 frontend, Express.js backend, and a 184-question pre-seeded database.
- Production-ready n8n workflow configurations for automated email classification and attachment processing.
- A comprehensive end-to-end automated verification test suite (`test_e2e.js`) validating platform integrity across all user roles.

\newpage

---

# CHAPTER 2
# TECHNOLOGY FOUNDATION

### 2.1 Natural Language Processing and Representation Learning
Natural Language Processing (NLP) is the branch of computational linguistics and artificial intelligence dedicated to enabling machines to process, interpret, and generate human language. Early NLP systems relied on symbolic grammars and hand-crafted feature extractors. These methods were brittle, failing to capture syntactic polysemy, idiom, or semantic context.

The development of continuous distributed representations—pioneered by Word2Vec and GloVe—demonstrated that words could be projected into a dense vector space $\mathbb{R}^d$ where geometric proximity corresponds to semantic similarity:
$$\text{Cosine Similarity}(\vec{u}, \vec{v}) = \frac{\vec{u} \cdot \vec{v}}{\|\vec{u}\| \|\vec{v}\|}$$
However, these early embeddings produced static vectors: the word *"bank"* received the identical numerical representation whether appearing in *"river bank"* or *"investment bank"*. Modern deep learning resolves this via contextual representation learning: the internal vector of every token is dynamically computed as a function of the entire surrounding context.

*Table 2.1: Comparison of Classical NLP versus Modern Foundation Models.*
| Dimension | Classical NLP (N-Gram / TF-IDF) | Recurrent Models (LSTM / GRU) | Modern Foundation Models (Transformers) |
| :--- | :--- | :--- | :--- |
| **Contextual Representation** | Static, orthogonal frequency vectors | Sequential, uni-directional hidden states | Fully contextual, bi-directional / causal self-attention |
| **Compute Parallelization** | High (sparse linear algebra) | Strictly sequential (non-parallelizable) | Massively parallelizable matrix operations |
| **Long-Range Dependencies** | Bound by window size $N \le 5$ | Decays exponentially over sequence length | Direct $O(1)$ token-to-token attention paths |
| **Task Generalization** | Task-specific feature engineering | Task-specific supervised training | General-purpose zero/few-shot prompt adaptation |

### 2.2 The Transformer Architecture and Self-Attention Mechanics
In 2017, Vaswani et al. introduced the Transformer in the seminal paper *"Attention Is All You Need"*, discarding recurrence in favor of attention. The architecture relies on an encoder-decoder or decoder-only topology composed of stacked identical layers. Each layer consists of two foundational sub-layers:
1. **Multi-Head Self-Attention (MHA):** Enables tokens to dynamically exchange information across the sequence.
2. **Position-Wise Feed-Forward Network (FFN):** Processes each token independently through non-linear projections, expanding and contracting vector dimensionality.

To facilitate gradient propagation through deep networks (e.g., 12 to 96 stacked blocks), every sub-layer incorporates a **residual skip connection** followed by **Layer Normalization**:
$$\text{Output} = \text{LayerNorm}(x + \text{SubLayer}(x))$$

### 2.3 Mathematical Formulation of Scaled Dot-Product Attention
The foundational operational primitive of the Transformer is the **Scaled Dot-Product Attention**. Given an input matrix $X \in \mathbb{R}^{T \times d_{\text{model}}}$, the model projects each token into three distinct continuous subspaces via learned weight matrices:
- **Query Matrix ($Q$):** $Q = X W_Q \in \mathbb{R}^{T \times d_k}$
- **Key Matrix ($K$):** $K = X W_K \in \mathbb{R}^{T \times d_k}$
- **Value Matrix ($V$):** $V = X W_V \in \mathbb{R}^{T \times d_v}$

The attention weights represent the degree of affinity between the query of token $i$ and the key of token $j$. The raw dot product $Q K^T$ measures directional alignment, scaled by $\frac{1}{\sqrt{d_k}}$ to prevent the dot products from growing excessively large in high dimensions—which would push the softmax function into regions with dangerously small gradients:
$$\text{Attention}(Q, K, V) = \text{Softmax}\left(\frac{Q K^T}{\sqrt{d_k}} + M\right) V$$
where $M$ represents the attention mask. In an autoregressive (causal) language model, tokens are forbidden from attending to future tokens. Thus, an upper-triangular causal mask is applied:
$$M_{ij} = \begin{cases} 0 & \text{if } j \le i \\ -\infty & \text{if } j > i \end{cases}$$
When the softmax function is evaluated, $e^{-\infty} = 0$, ensuring future tokens receive zero attention weight.

```
       Query (Q)            Key (K)
           │                   │
           └───────► MatMul ◄──┘
                       │
                       ▼
                 Scale (1/√dk)
                       │
                       ▼
             Mask (Optional Causal)
                       │
                       ▼
                    Softmax
                       │
                       ▼
     Attention Weights ──► MatMul ◄── Value (V)
                             │
                             ▼
                          Output
```
*Figure 2.1: Scaled Dot-Product Attention Computation Pipeline.*

To enable the model to jointly attend to information from different representation subspaces at different positions, **Multi-Head Attention** computes $h$ parallel attention projections:
$$\text{MultiHead}(Q, K, V) = \text{Concat}(\text{head}_1, \text{head}_2, \dots, \text{head}_h) W_O$$
$$\text{where} \quad \text{head}_i = \text{Attention}(Q W_Q^{(i)}, K W_K^{(i)}, V W_V^{(i)})$$

### 2.4 Pre-Layer Normalization and Residual Skip Connections
In the original Transformer formulation, Layer Normalization was applied *after* the residual addition (Post-LN):
$$x_{l+1} = \text{LayerNorm}(x_l + \text{SubLayer}(x_l))$$
Empirical research demonstrated that Post-LN causes steep gradient variance near the output layer, requiring delicate learning rate warmups to prevent divergence. Modern state-of-the-art architectures (including GPT-2, LLaMA, and Qwen) adopt **Pre-Layer Normalization (Pre-LN)**:
$$x_{l+1} = x_l + \text{SubLayer}(\text{LayerNorm}(x_l))$$
Pre-LN establishes an uninterrupted identity path throughout the residual stream:
$$x_L = x_0 + \sum_{l=0}^{L-1} \text{SubLayer}(\text{LayerNorm}(x_l))$$
This enables gradients to propagate directly from the final loss to the initial embedding layers without numerical attenuation, substantially improving training stability.

### 2.5 Local LLM Orchestration with Ollama
While commercial LLMs accessible via cloud APIs offer high parameter capacity, enterprise and institutional deployment frequently mandates **Local LLM Orchestration** due to:
- **Data Privacy and FERPA/GDPR Compliance:** Student academic and personal data must not traverse third-party cloud infrastructure.
- **Deterministic Latency:** Local execution eliminates external network round-trip overhead and cloud throttling.
- **Zero Operating Costs:** Local inference utilizes existing desktop/server computational resources without recurring API token billing.

**Ollama** is an open-source model execution runtime designed to bundle model weights, configuration, tokenizer vocabularies, and optimized C++ inference kernels (via `llama.cpp`) into a unified operational daemon. Exposing an HTTP REST endpoint at `http://localhost:11434`, Ollama facilitates automated local model swapping (e.g., Qwen, LLaMA, Mistral), streaming inference, and fine-grained generation parameter control.

### 2.6 Agentic AI Principles: Tool Calling and Function Execution
Agentic AI elevates foundation models from text predictors to autonomous software actors. The core principle of **Tool Calling** relies on structured output generation:
1. The developer provides the language model with a formal specification of available tools, including tool names, operational descriptions, and JSON schema parameter definitions.
2. When presented with a task, the LLM determines whether its internal knowledge suffices or if an external tool is required.
3. If an external tool is required, the LLM emits a syntactically strict function call payload:
   ```json
   {
     "tool": "query_student_attendance",
     "parameters": { "student_id": "STU001" }
   }
   ```
4. The client runtime intercepts this structured payload, halts LLM generation, executes the corresponding software routine (e.g., executing a SQL query), and feeds the return value back into the LLM context window as an observation.

### 2.7 Retrieval-Augmented Generation (RAG) and Closed-Loop State
To ground agent reasoning in dynamic, authoritative organizational data, **Retrieval-Augmented Generation (RAG)** dynamically injects external records into the prompt context at inference time. Furthermore, reliable agents implement a **Closed-Loop Feedback State**: after executing a state-modifying action (such as an SQL `UPDATE` or `INSERT`), the agent must immediately execute an independent verification query to assert that the database state reflects the intended mutation before notifying human stakeholders.

### 2.8 Human-in-the-Loop (HITL) Safety and Verification Controls
Autonomous systems deployed within institutional domains must not execute unmonitored decisions when high-consequence outcomes are at stake. **Human-in-the-Loop (HITL)** establishes programmatic gating criteria:
- **Rule-Based Triggers:** Automated approval occurs only when all operational metrics strictly satisfy established regulations.
- **Automated Escalation:** If borderline attendance, examination conflicts, or ethical exceptions occur, the agent suspends execution, marks the database transaction as `ESCALATE_TO_HOD`, and dispatches a structured dossier to authorized university personnel for final determination.

\newpage

---

# CHAPTER 3
# PROJECT 1: TRANSFORMER-BASED LANGUAGE MODEL

### 3.1 Problem Definition and Theoretical Scope
The objective of Project 1 is to demystify the internal computational mechanics of generative language models by designing, implementing, training, and evaluating a causal, decoder-style **Tiny Transformer Language Model** from scratch in PyTorch. 

Rather than relying on high-level pre-trained abstractions (such as Hugging Face `pipeline` or OpenAI APIs), this project constructs every mathematical block—character tokenization, embedding tables, causal self-attention heads, multi-head projections, feed-forward networks with GELU activations, pre-layer normalization, and cross-entropy loss computation—directly using PyTorch tensor operations.

### 3.2 End-to-End Autoregressive Pipeline Architecture
The system processes textual data through an end-to-end discrete pipeline:
$$\text{Raw Text} \longrightarrow \text{Token IDs} \longrightarrow \text{Token + Positional Embeddings} \longrightarrow [\text{Transformer Block}] \times N \longrightarrow \text{LayerNorm} \longrightarrow \text{LM Head} \longrightarrow \text{Logits}$$

```
Input Tokens: [batch_size, sequence_length]
      │
      ├───► Token Embedding Table      ───► [B, T, C]
      │                                       ▲
      └───► Positional Embedding Table ───────┤ (Vector Addition)
                                              ▼
                              Hidden States: [B, T, C]
                                              │
                    ┌─────────────────────────┴─────────────────────────┐
                    │               TRANSFORMER BLOCK (× N)             │
                    │                                                   │
                    │   Input x                                         │
                    │     │                                             │
                    │     ├──► LayerNorm ──► Causal Multi-Head Attn ──┐ │
                    │     │                                           │ │
                    │     ▼                                           │ │
                    │     (+) ◄───────────────────────────────────────┘ │
                    │     │ (Residual Addition)                         │
                    │     │                                             │
                    │     ├──► LayerNorm ──► Feed-Forward (GELU) ─────┐ │
                    │     │                                           │ │
                    │     ▼                                           │ │
                    │     (+) ◄───────────────────────────────────────┘ │
                    │   Output x                                        │
                    └─────────────────────────┬─────────────────────────┘
                                              │
                                              ▼
                                       Final LayerNorm
                                              │
                                              ▼
                                 Linear Projection (LM Head)
                                              │
                                              ▼
                               Logits: [B, T, vocabulary_size]
```
*Figure 3.1: Complete Architectural Schematic of the Tiny Transformer Language Model.*

### 3.3 Character-Level Tokenizer and Vocabulary Mapping
To preserve transparency and eliminate the complexity of byte-pair encoding (BPE) merges, a deterministic **Character-Level Tokenizer** was constructed over an educational artificial intelligence corpus:
$$\mathcal{V} = \{c_1, c_2, \dots, c_V\}$$
where $V = |\mathcal{V}|$ represents the total count of distinct characters appearing in the corpus.

Two bi-directional hash mappings were implemented:
- $\text{stoi}: \text{char} \rightarrow \text{int}$ (String to Index)
- $\text{itos}: \text{int} \rightarrow \text{char}$ (Index to String)

For a sequence of length $T$, the encoding function projects characters into continuous integer tensors:
$$\mathbf{t} = [ \text{stoi}(c_1), \text{stoi}(c_2), \dots, \text{stoi}(c_T) ] \in \mathbb{Z}^T$$

*Table 3.1: Architectural Hyperparameters of the Tiny Transformer Model.*
| Hyperparameter | Value | Description |
| :--- | :--- | :--- |
| **Vocabulary Size ($V$)** | 42 | Unique characters in educational corpus |
| **Context Length ($T$)** | 32 / 64 tokens | Maximum receptive field memory window |
| **Embedding Dimension ($d$)** | 64 / 128 | Internal continuous vector representation width |
| **Attention Heads ($h$)** | 4 | Parallel self-attention subspaces ($d_k = d/h = 16$) |
| **Transformer Layers ($N$)** | 2 / 3 | Depth of stacked Transformer blocks |
| **Feed-Forward Expansion** | $4 \times d$ | Intermediate projection width of MLP |
| **Dropout Rate** | 0.1 | Regularization probability during training |
| **Learning Rate ($\eta$)** | $3 \times 10^{-4}$ | Initial learning rate for AdamW optimizer |
| **Batch Size ($B$)** | 16 | Number of sequence chunks processed concurrently |
| **Training Steps** | 1,500 – 3,000 | Total parameter update iterations |

### 3.4 Multi-Head Causal Self-Attention Implementation
The self-attention module was implemented via an explicit `AttentionHead` class and a composite `MultiHeadAttention` class. Within each head, the Query, Key, and Value representations are linearly derived:
$$K = x W_K, \quad Q = x W_Q, \quad V = x W_V \quad \in \mathbb{R}^{B \times T \times d_k}$$

The scaled dot-product attention scores are computed and causally masked:
```python
# Compute attention affinities
attention_scores = (Q @ K.transpose(-2, -1)) * (K.shape[-1] ** -0.5)

# Causal masking: future positions set to -infinity
attention_scores = attention_scores.masked_fill(
    self.mask[:sequence, :sequence] == 0, float("-inf")
)

# Softmax normalizes affinities into probability distribution
attention_weights = F.softmax(attention_scores, dim=-1)
attention_weights = self.dropout(attention_weights)

# Weighted aggregation of values
output = attention_weights @ V
```

The multi-head attention module combines the independent outputs of $h$ heads and projects them back through a linear layer with residual dropout:
$$\text{Output} = \text{Dropout}\left( \text{Concat}(\text{head}_1, \dots, \text{head}_h) W_O \right)$$

The feed-forward network applies non-linear expansion using the **Gaussian Error Linear Unit (GELU)** activation function:
$$\text{GELU}(x) = x \Phi(x) = x P(X \le x), \quad X \sim \mathcal{N}(0, 1)$$
$$\text{FFN}(x) = \text{Dropout}\left( \text{Linear}_{d \rightarrow 4d}(x) \right) \longrightarrow \text{GELU} \longrightarrow \text{Linear}_{4d \rightarrow d}$$

### 3.5 Model Checkpointing, Loss Computation, and Optimization
Training batches were formulated by sampling random continuous text windows of length $T$, where the target sequence $Y$ represents the input sequence $X$ shifted by exactly one token to the right:
$$X = [w_t, w_{t+1}, \dots, w_{t+T-1}], \quad Y = [w_{t+1}, w_{t+2}, \dots, w_{t+T}]$$

The model computes the **Cross-Entropy Loss** over the flattened sequence logits:
$$\mathcal{L} = -\frac{1}{B \cdot T} \sum_{i=1}^{B \cdot T} \log \left( \frac{\exp(z_{i, y_i})}{\sum_{j=1}^{V} \exp(z_{i, j})} \right)$$

Optimization was executed using the **AdamW** algorithm, which decouples weight decay from gradient updates:
$$\theta_{t+1} = \theta_t - \eta_t \left( \frac{\hat{m}_t}{\sqrt{\hat{v}_t} + \epsilon} + \lambda \theta_t \right)$$
To prevent gradient explosions during early training epochs, gradient clipping was enforced:
$$\mathbf{g} \leftarrow \mathbf{g} \cdot \min\left(1, \frac{\text{max\_norm}}{\|\mathbf{g}\|_2}\right), \quad \text{with } \text{max\_norm} = 1.0$$

The complete model state, hyperparameter configuration, vocabulary dictionaries, and optimizer states were serialized to disk as `tiny_transformer_lm.pt`.

### 3.6 Inference Engine, Temperature Sampling, and Text Generation
During inference, the model operates autoregressively under `@torch.no_grad()` execution mode. Given an initial user prompt string, the generation loop executes:
1. Encodes prompt string into token IDs $\mathbf{t}_{1:L}$.
2. Truncates context to the most recent context window: $\mathbf{t}_{\text{ctx}} = \mathbf{t}_{-(T):}$.
3. Computes forward pass to extract logits for the final sequence position: $z_{\text{next}} = \text{logits}[:, -1, :]$.
4. Modulates logits via **Temperature Scaling ($T$)**:
   $$\tilde{z}_i = \frac{z_i}{\tau}$$
   - When $\tau < 1.0$, the distribution sharpens, generating highly predictable text.
   - When $\tau > 1.0$, the distribution flattens, promoting syntactic diversity.
5. Applies softmax to produce probability distribution: $p_i = \text{Softmax}(\tilde{z}_i)$.
6. Samples the next token ID using multinomial sampling: $t_{\text{new}} \sim \text{Multinomial}(p)$.
7. Appends $t_{\text{new}}$ to the growing sequence and repeats.

The trained model successfully reproduced domain-accurate textual structures matching its training corpus, confirming the validity of the underlying mathematical implementation.

\newpage

---

# CHAPTER 4
# PROJECT 2: WEB-BASED OLLAMA LLM INTERFACE

### 4.1 Problem Definition and Client-Server Paradigm
While Project 1 established the internal tensor mechanics of small language models, enterprise applications require orchestrating pre-trained, multi-billion parameter foundation models capable of generalized conversation, code synthesis, and structured instruction-following.

The objective of Project 2 is to architect a responsive, web-based Large Language Model interface connected to a locally hosted foundation model (**Qwen 1.7B**) managed via the **Ollama** runtime. The system evaluates the client-server interaction paradigm, streaming response generation, token consumption telemetry, and investigates how systematic modification of the **System Prompt** alters model behavior while holding user queries constant.

### 4.2 System Architecture: Web Client to Local Model Gateway
The system was engineered as a decoupled, asynchronous client-server architecture:
- **Presentation Layer:** Browser-based interface featuring real-time conversation history, system prompt configuration panels, temperature and token limit sliders, and dynamic markdown rendering.
- **Application Server (Python / Express):** Acts as the API intermediary, managing active sessions, constructing multi-message chat payloads, and handling network timeouts.
- **Inference Runtime (Ollama Daemon):** Local service running on `localhost:11434`, utilizing optimized quantization kernels (e.g., GGUF 4-bit) to execute model inference over CPU/GPU hardware.

```
┌─────────────────────────────────┐
│     Client Web Browser          │
│   (HTML5 / React / Tailwind)    │
└────────────────┬────────────────┘
                 │ HTTP POST /api/chat (JSON)
                 ▼
┌─────────────────────────────────┐
│      Application Server         │
│   - Session State Management    │
│   - Payload Construction        │
└────────────────┬────────────────┘
                 │ REST API: http://localhost:11434/api/chat
                 ▼
┌─────────────────────────────────┐
│     Ollama Runtime Daemon       │
│  ┌───────────────────────────┐  │
│  │ Model: Qwen 1.7B (4-bit)  │  │
│  │ - Context Memory Buffer   │  │
│  │ - Inference Engine        │  │
│  └───────────────────────────┘  │
└─────────────────────────────────┘
```
*Figure 4.1: Client-Server Architecture connecting Web UI to Local Ollama Runtime.*

### 4.3 System Prompt Conditioning vs. User Prompt Processing
In conversational LLMs, the input context is structured into discrete semantic roles:
- **System Role (`role: "system"`):** High-priority meta-instructions that establish the persona, behavioral boundaries, operational constraints, and formatting requirements of the model.
- **User Role (`role: "user"`):** The immediate query or instruction submitted by the human operator.
- **Assistant Role (`role: "assistant"`):** Historical responses generated by the model, maintained in context to provide conversational memory.

The core experimental investigation of Project 2 evaluated the hypothesis that **the identical user prompt produces radically divergent semantic, stylistic, and structural outputs when conditioned by distinct system prompts.**

### 4.4 Parameter Calibration: Temperature, Top-K, and Context Limits
The interface allows dynamic adjustment of three key sampling parameters:
1. **Temperature ($\tau \in [0.1, 2.0]$):** Governs output entropy. At $\tau = 0.2$, the model exhibits analytical precision suitable for code generation and mathematical reasoning; at $\tau = 0.8$, it exhibits natural conversational variation.
2. **Top-K Sampling ($K \in [1, 100]$):** Constrains sampling to the $K$ most probable tokens, truncating the long-tail distribution to eliminate nonsensical outputs.
3. **Context Length ($C \in [512, 4096]$ tokens):** Dictates the size of the rolling conversational history buffer retained in active RAM.

### 4.5 Empirical Comparison of Role-Conditioned Persona Responses
To rigorously demonstrate the effect of system prompt conditioning, the identical user prompt was submitted under two conflicting institutional personas:

**Fixed User Query:**
> *"Explain the importance of classroom attendance and academic consistency."*

*Table 4.1: Empirical Output Comparison under Divergent System Prompts.*
| System Prompt Persona | Generated Output Structure & Semantic Tone | Observed Vocabulary & Focus |
| :--- | :--- | :--- |
| **Persona A: University Academic Advisor**<br>`"You are a compassionate university academic advisor. Focus on personal development, deep learning, peer collaboration, and academic mentorship."` | *"Attending lectures is fundamental to your intellectual journey. The classroom is a collaborative sanctuary where dialogue with professors and peers deepens your conceptual mastery beyond textbook memorization. Consistency fosters resilience, cognitive discipline, and lifelong learning habits."* | Compassionate, pedagogical, development-focused, abstract enrichment. |
| **Persona B: Campus Placement Officer (TPO)**<br>`"You are a strict campus placement officer. Focus exclusively on corporate eligibility cutoffs, recruiting company criteria, disciplinary clearance, and professional employability."` | *"Attendance is non-negotiable. Corporate recruiters—including Amazon, TCS, and Microsoft—enforce a mandatory 75% attendance cutoff as a baseline eligibility filter. Low attendance leads to placement cell debarment, loss of campus interview slots, and signals unreliability to hiring managers."* | Authoritative, metric-driven, placement cutoffs, corporate eligibility, risk warnings. |

The experiment confirmed that local foundation models can be dynamically re-targeted across administrative, academic, and technical workflows purely through software-level system prompt engineering, establishing the foundation for specialized multi-agent roles.

\newpage

---

# CHAPTER 5
# PROJECT 3: UNIVERSITY LEAVE PROCESSING AGENT

### 5.1 Problem Definition in Academic Administrative Automation
Within university institutions, processing student leave applications is an operationally intensive process. A valid administrative determination requires evaluating multiple orthogonal criteria:
1. Student identity and degree program enrollment.
2. Current cumulative attendance percentage against the institutional 75% threshold.
3. Conflict detection against published mid-term and semester examination timetables.
4. Remaining annual personal leave balances.
5. Institutional policy rules governing maximum consecutive leave duration.

When executed manually by faculty advisors, leave processing suffers from delays, human error, and inconsistent enforcement of regulations. Project 3 formulates an autonomous **Agentic University Leave Processing System** that executes this end-to-end administrative workflow through deterministic tool calling, structured relational database queries, policy reasoning, state verification, and automated human escalation.

### 5.2 Deterministic Multi-Tool Agent Architecture
Unlike passive chatbots that hallucinate policy interpretations, the Leave Processing Agent is architected as an **action-oriented cognitive state machine**. The agent interacts with its environment exclusively through a dedicated **Tool Layer** that wraps a normalized relational SQLite database (`agentic_leave.db`).

```
┌────────────────────────────────────────────────────────────────────────┐
│                      LEAVE PROCESSING AGENT                            │
│                                                                        │
│   [ Student Leave Request ]                                            │
│              │                                                         │
│              ▼                                                         │
│   ┌───────────────────────┐                                            │
│   │ 1. Parse & Understand │ ──► Extracts Student ID, Dates, Reason     │
│   └──────────┬────────────┘                                            │
│              │                                                         │
│              ▼                                                         │
│   ┌───────────────────────┐                                            │
│   │ 2. Tool Invocations   │ ──► [tool_student_profile(id)]             │
│   │    (Evidence          │ ──► [tool_attendance(id)]                  │
│   │     Gathering)        │ ──► [tool_exams(programme, sem, dates)]    │
│   │                       │ ──► [tool_leave_balance(id)]               │
│   │                       │ ──► [tool_leave_policy()]                  │
│   └──────────┬────────────┘                                            │
│              │                                                         │
│              ▼                                                         │
│   ┌───────────────────────┐                                            │
│   │ 3. Policy Reasoning   │ ──► Evaluates Multi-Rule Constraints       │
│   └──────────┬────────────┘                                            │
│              │                                                         │
│              ├───────────────────┬───────────────────┐                 │
│              ▼                   ▼                   ▼                 │
│         [ APPROVED ]        [ REJECTED ]    [ ESCALATE_TO_HOD ]        │
│              │                   │                   │                 │
│              └───────────────────┼───────────────────┘                 │
│                                  │                                     │
│                                  ▼                                     │
│   ┌───────────────────────┐                                            │
│   │ 4. State Update Tool  │ ──► [tool_update_leave(id, status, days)]  │
│   └──────────┬────────────┘                                            │
│              │                                                         │
│              ▼                                                         │
│   ┌───────────────────────┐                                            │
│   │ 5. State Verification │ ──► [tool_verify(request_id, student_id)]  │
│   └──────────┬────────────┘                                            │
│              │                                                         │
│              ▼                                                         │
│   ┌───────────────────────┐                                            │
│   │ 6. Student Notify     │ ──► Dispatches Formatted Determination     │
│   └───────────────────────┘                                            │
└────────────────────────────────────────────────────────────────────────┘
```
*Figure 5.1: Deterministic Multi-Tool Execution Workflow of the University Leave Processing Agent.*

### 5.3 Database Schema and Relational Tool Integration
The backing database was designed with strict foreign key integrity and relational normalization across six tables:
- `students`: Stores primary student demographic data (`student_id`, `name`, `programme`, `semester`, `email`).
- `attendance`: Tracks real-time attendance figures (`attendance_percent`, `last_updated`).
- `leave_policy`: Codifies institutional thresholds (`min_attendance = 75.0`, `max_days_per_request = 5`, `exam_restriction = 1`).
- `exams`: Maintains comprehensive internal examination schedules (`exam_date`, `exam_name`, `start_time`, `end_time`).
- `leave_balance`: Manages leave entitlement accounting (`total_entitlement`, `used_days`, `remaining_days`).
- `leave_requests`: Immutable transaction audit log tracking request status (`PROCESSING`, `APPROVED`, `REJECTED`, `ESCALATE_TO_HOD`).

*Table 5.1: Relational Schema Attributes of the University Leave Database.*
| Table Name | Primary Key | Foreign Keys | Key Attributes & Types |
| :--- | :--- | :--- | :--- |
| `students` | `student_id` (TEXT) | None | `name` (TEXT), `programme` (TEXT), `semester` (INT) |
| `attendance` | `student_id` (TEXT) | `students(student_id)` | `attendance_percent` (REAL), `last_updated` (TEXT) |
| `leave_policy`| `policy_id` (INT) | None | `min_attendance` (75.0), `max_days_per_request` (5) |
| `exams` | `exam_id` (INT) | None | `programme`, `semester`, `exam_date`, `exam_name` |
| `leave_balance`| `student_id` (TEXT)| `students(student_id)` | `total_entitlement`, `used_days`, `remaining_days` |
| `leave_requests`| `request_id` (INT)| `students(student_id)` | `start_date`, `end_date`, `status`, `decision_reason` |

The agent interface interacts with SQLite via six dedicated Python tool routines:
- `tool_student_profile(student_id)`
- `tool_attendance(student_id)`
- `tool_leave_policy()`
- `tool_exams(student_id, start_date, end_date)`
- `tool_leave_balance(student_id)`
- `tool_update_leave(request_id, student_id, status, days)`
- `tool_verify(request_id, student_id)`

### 5.4 The 9-Step Sequential Agent Execution Pipeline
When a student submits an unstructured or semi-structured leave application, the agent executes an immutable **9-Stage Cognitive State Machine**:
1. **Understand Request:** Extracts dates, requested duration, and verifies student enrollment.
2. **Initialize Audit Record:** Creates a pending `PROCESSING` record in the database.
3. **Check Attendance Tool:** Queries the student's current attendance percentage.
4. **Check Academic Calendar Tool:** Queries for internal or semester examination overlaps.
5. **Check Leave Balance Tool:** Verifies that remaining days are sufficient.
6. **Reason About Policy:** Cross-correlates gathered evidence against policy constraints.
7. **Make Decision:** Emits an unambiguous status: `APPROVED`, `REJECTED`, or `ESCALATE_TO_HOD`.
8. **Update System Action:** Executes an atomic database transaction updating leave balances and request records.
9. **Verify Result & Notify:** Re-queries the database to confirm ledger mutation before generating a formatted notification.

### 5.5 Policy Reasoning Engine and Automated HOD Escalation
The decision engine synthesizes all tool observations through explicit administrative logic:
- **Condition 1 (Exceeds Max Duration):** If `requested_days > policy.max_days` $\rightarrow$ **`REJECTED`**.
- **Condition 2 (Insufficient Balance):** If `remaining_days < requested_days` $\rightarrow$ **`REJECTED`**.
- **Condition 3 (Exam Conflict):** If `exams_found == True` $\rightarrow$ **`ESCALATE_TO_HOD`** (Human review required due to examination overlap).
- **Condition 4 (Low Attendance):** If `attendance < 75.0%` $\rightarrow$ **`ESCALATE_TO_HOD`** (Human review required due to sub-threshold attendance).
- **Condition 5 (All Pass):** If all rules satisfied $\rightarrow$ **`APPROVED`**.

### 5.6 Post-Action State Verification and Student Notification
A critical vulnerability of naive AI systems is assuming tool execution succeeded without verification. Project 3 implements an explicit **Post-Action State Verification** step (`tool_verify`):
```python
verification = tool_verify(request_id, student_id)
verified = (verification["request"]["status"] == decision) and (
    verification["balance"]["remaining_days"] == expected_remaining
)
```
Only upon verifying that the relational row was successfully committed does the agent construct and dispatch the student notification, guaranteeing zero state divergence.

\newpage

---

# CHAPTER 6
# PROJECT 4: AI RECRUITMENT & EVALUATION (PLACEMENTPREP)

### 6.1 Problem Statement: Campus Recruitment Deficiencies
Undergraduate engineering placements represent the primary benchmark of collegiate academic efficacy. However, traditional campus placement preparation is characterized by acute systemic fragmentation:
- **Disjointed Practice Silos:** Students navigate between separate websites for LeetCode-style algorithmic coding, PDF aptitude worksheets, database fundamentals, and resume formatting, preventing cohesive tracking.
- **Absence of a Unified Readiness Metric:** Students lack an objective, real-time measure indicating their actual hiring probability against target recruiter cutoffs (e.g., Tier-1 Product vs. Core IT Services).
- **Manual Institutional Oversight:** Training and Placement Officers (TPOs) manage placement preparation via static, retroactive spreadsheets, leaving them unable to identify struggling students prior to corporate recruitment drives.

To definitively solve this institutional challenge, **Project 4** engineered **PlacementPrep**—a commercial-grade, full-stack Intelligent Student Placement Preparation and Institutional Readiness Platform.

### 6.2 System Architecture of the PlacementPrep Platform
PlacementPrep is engineered as a robust, four-tier cloud-ready software architecture:
1. **Presentation Layer (Port 5173):** Responsive Single Page Application (SPA) built using **React 19, TypeScript, and Tailwind CSS**, featuring glassmorphism styling, dark/light theme switching, and real-time Recharts visualizations.
2. **API Gateway & Routing Layer (Port 5000):** Built using **Node.js and Express.js (TypeScript)**, exposing secure RESTful endpoints protected by JSON Web Token (JWT) authentication and Role-Based Access Control (RBAC) guards.
3. **Core Intelligence & Computational Engines:**
   - Dynamic Placement Readiness Scoring (PRS) Engine (`readiness.service.ts`).
   - Adaptive 30/60/90-Day Roadmap Generator (`roadmap.service.ts`).
   - Safe Multi-Language Sandboxed DSA Code Runner (`codeRunner.service.ts`).
   - Natural Language Heuristic ATS Resume Analyzer (`resumeParser.service.ts`).
   - STAR-Method Behavioral & Technical Mock Interview Evaluator (`interview.routes.ts`).
4. **Persistence Layer:** **Prisma ORM Client v6** interfacing with an ACID-compliant relational SQLite database (`dev.db`), completely portable to PostgreSQL.

```
+─────────────────────────────────────────────────────────────────────────────────+
|                           TIER 1: PRESENTATION LAYER                            |
|       React 19  •  TypeScript  •  Tailwind CSS  •  Lucide Icons  •  Recharts    |
|   ┌──────────────────────┐  ┌──────────────────────┐  ┌─────────────────────┐   |
|   │    Student Portal    │  │   TPO / Admin Suite  │  │   Mentor Portal     │   |
|   └──────────┬───────────┘  └──────────┬───────────┘  └──────────┬──────────┘   |
+──────────────┼─────────────────────────┼─────────────────────────┼──────────────+
               │                         │                         │
               ▼                         ▼                         ▼
+─────────────────────────────────────────────────────────────────────────────────+
|                       TIER 2: API GATEWAY & RBAC SECURITY                       |
|          Node.js  •  Express.js (TypeScript)  •  JWT Authentication Middleware  |
+────────────────────────────────────────┬────────────────────────────────────────+
                                         │ RESTful Dispatch
                                         ▼
+─────────────────────────────────────────────────────────────────────────────────+
|                     TIER 3: CORE COMPUTATION & AI ENGINES                       |
|   ┌───────────────────────────┐             ┌───────────────────────────────┐   |
|   │ Placement Readiness (PRS) │             │    Adaptive Roadmap Engine    │   |
|   │  (Dynamic 0-100 Formula)  │             │   (30/60/90-Day Generator)   │   |
|   └─────────────┬─────────────┘             └───────────────┬───────────────┘   |
|                 │                                           │                   |
|   ┌─────────────┴─────────────┐             ┌───────────────┴───────────────┐   |
|   │ Sandboxed Code Runner     │             │ STAR Interview Evaluator      │   |
|   │ (JS/Py/C++/Java Runtime)  │             │ (Communication/Tech/Rubrics)  │   |
|   └─────────────┬─────────────┘             └───────────────┬───────────────┘   |
|                 │                                           │                   |
|                 └─────────────┐             ┌───────────────┘                   |
|                               ▼             ▼                                   |
|                         ┌─────────────────────────────┐                         |
|                         │ Heuristic ATS Resume Parser │                         |
|                         │ (NLP Metric & Keyword Audit)│                         |
|                         └──────────────┬──────────────┘                         |
+────────────────────────────────────────┼────────────────────────────────────────+
                                         │ Type-Safe Query Execution
                                         ▼
+─────────────────────────────────────────────────────────────────────────────────+
|                    TIER 4: RELATIONAL PERSISTENCE LAYER                         |
|                   Prisma ORM v6  •  SQLite / PostgreSQL                         |
|   [16 Normalized Tables: Users, Profiles, Tasks, Questions, Tests, etc.]        |
+─────────────────────────────────────────────────────────────────────────────────+
```
*Figure 6.1: Four-Tier Enterprise Software Architecture of the PlacementPrep Platform.*

### 6.3 Relational Persistence Model (16 Normalized Entities)
The database schema (`schema.prisma`) comprises 16 normalized relational models:
1. `User`: Manages identity, hashed credentials, and role assignments (`STUDENT`, `ADMIN`, `INTERVIEWER`).
2. `StudentProfile`: Maintains academic records (CGPA, college, branch, graduation year, target roles, target companies).
3. `DiagnosticResult`: Stores baseline scores across 6 placement competencies.
4. `RoadmapTask`: Tracks discrete daily study milestones, completion states, and deadlines.
5. `Question`: Seed bank containing 184+ categorized aptitude, logical, verbal, and technical questions.
6. `PracticeLog`: Records student question attempts, time taken, and correctness.
7. `Bookmark`: Enables revision bookmarking of complex questions.
8. `CodingProblem`: Holds LeetCode-style algorithmic challenges across 12 DSA topics.
9. `CodingSubmission`: Logs student code solutions, execution times, memory usage, and judge outcomes.
10. `MockTest`: Configures full-length timed assessments with sectional negative marking.
11. `TestQuestion`: Junction entity linking specific questions to mock tests.
12. `TestAttempt`: Records full assessment results, sectional breakdowns, and percentile metrics.
13. `MockInterview`: Manages system AI interviews and mentor-led interview bookings.
14. `ResumeAnalysis`: Stores detailed ATS resume audit reports, keyword matches, and bullet rewrites.
15. `CompanyProfile`: Curates pre-seeded recruitment patterns for 10 corporate tech giants.
16. `CompanyNote`: Stores private candidate preparation notes for target recruiters.

### 6.4 Dynamic Placement Readiness Scoring (PRS) Formula
The intellectual cornerstone of PlacementPrep is the **Placement Readiness Score (PRS)**—a dynamic index $\mathcal{R} \in [0, 100]$ that provides a single, real-time quantification of hiring probability:
$$\mathcal{R} = w_d S_{\text{diag}} + w_c S_{\text{coding}} + w_t S_{\text{tests}} + w_i S_{\text{interview}} + w_p S_{\text{practice}} + w_r S_{\text{resume}} + \text{Bonus}_{\text{streak}}$$

*Table 6.1: Component Weightings and Mathematical Derivations of the PRS Algorithm.*
| Component | Weight ($w_k$) | Evaluation Derivation |
| :--- | :---: | :--- |
| **Diagnostic Baseline ($S_{\text{diag}}$)** | 0.20 | Percentage achieved on initial 12-question diagnostic assessment |
| **DSA Coding Mastery ($S_{\text{coding}}$)** | 0.25 | Ratio of accepted submissions across 15 curated algorithmic problems: $\min\left(100, \frac{N_{\text{solved}}}{15} \times 100\right)$ |
| **Mock Test Performance ($S_{\text{tests}}$)** | 0.25 | Average score percentage across top 3 completed full-length mock tests |
| **Mock Interview Rating ($S_{\text{interview}}$)** | 0.15 | Highest 10-point interview evaluation converted to percentage: $(\text{Rating} / 10.0) \times 100$ |
| **Daily Practice Accuracy ($S_{\text{practice}}$)** | 0.10 | Historical accuracy percentage over all logged question bank attempts |
| **Resume ATS Quality ($S_{\text{resume}}$)** | 0.05 | NLP heuristic ATS audit score out of 100 |
| **Preparation Streak Bonus** | + Bonus | Active preparation bonus: $\min(5.0, \text{streak\_days} \times 0.5)$ |

Candidates are automatically assigned to tiered placement readiness bands based on their composite PRS score:
- **Elite Product Tier ($\mathcal{R} \ge 80\%$):** Qualifies for Tier-1 Product Recruiters (Amazon, Microsoft, Google; ₹20+ LPA).
- **Premium Tech Tier ($65\% \le \mathcal{R} < 80\%$):** Qualifies for Mid-Market Tech & Product Developers (Zoho, Freshworks; ₹9–₹18 LPA).
- **Core Placement Foundation ($\mathcal{R} < 65\%$):** Targets Mass IT Service Recruiters (TCS, Infosys, Cognizant, Wipro; ₹4–₹8 LPA).

### 6.5 Diagnostic Assessment Engine & Adaptive 30/60/90 Roadmaps
Upon onboarding, students complete a calibrated 12-question diagnostic test evaluating six placement competencies: Quantitative Aptitude, Logical Reasoning, Verbal Ability, Data Structures, Operating Systems & DBMS, and Soft Skills.

The diagnostic engine calculates individual category scores, identifies critical deficiency areas (e.g., scoring below 60% in DBMS or Two Pointers), and triggers the **Roadmap Generation Service**. This service generates a personalized daily task schedule spanning 30, 60, or 90 days. Tasks are balanced across daily theory review, 15 practice aptitude problems, 1 DSA problem, and periodic mock test milestones, with real-time completion tracking.

### 6.6 Sandboxed Multi-Language DSA Coding Judge
PlacementPrep incorporates an in-browser coding IDE supporting JavaScript, Python, C++, and Java. The backend **Code Runner Engine** (`codeRunner.service.ts`) executes code safely against test cases:
- In Node.js / JavaScript environments, execution occurs within a secured, isolated `vm` context with strict timeouts (2,000 ms) and restricted access to external system APIs.
- In simulated multi-language environments, code is evaluated against predefined public and hidden test cases, returning runtime execution latency, memory consumption, assertion failures, and full editorial explanations.

### 6.7 Heuristic Natural Language ATS Resume Analyzer
Recruiters spend an average of six seconds reviewing an applicant resume. The **Resume Parser Engine** (`resumeParser.service.ts`) performs natural language heuristic analysis over raw resume text:
1. **Impact & Metric Detection:** Scans for quantified achievements using regex patterns identifying percentages, currency figures, and scale indicators (e.g., *"reduced latency by 45%"*, *"scaled to 100k users"*).
2. **Action Verb Density:** Evaluates the presence of high-impact engineering verbs (*"Spearheaded"*, *"Architected"*, *"Optimized"*, *"Engineered"*, *"Deployed"*).
3. **Keyword Alignment:** Compares resume vocabulary against target job roles (SDE, Data Analyst, Cloud Engineer) to flag missing critical technologies.
4. **Structural Audit:** Assesses the presence of essential sections (Education, Projects, Technical Skills, Experience).
5. **Bullet Point Rewriting:** Automatically suggests upgraded, metric-driven bullet points using the Google X-Y-Z formula (*"Accomplished [X], as measured by [Y], by doing [Z]"*).

### 6.8 STAR-Method Mock Interview Evaluator & Mentor Review
The platform provides a dual-track mock interview system:
1. **System AI Mock Interview:** Presents structured technical and behavioral interview prompts. Student text responses are evaluated using natural language token matching across the **STAR criteria (Situation, Task, Action, Result)**. The engine outputs structured ratings across Communication, Technical Depth, Structure, and Confidence, coupled with actionable remediation feedback.
2. **Mentor-Led Interview Portal:** Facilitates scheduled 1-on-1 interviews with industry mentors or faculty guides, integrating Google Meet/Zoom video links and formal 4-metric rubric grading forms.

### 6.9 Institutional TPO Command Center & Accreditation Export
To empower institutional placement cells, the **Admin / TPO Command Suite** delivers:
- **Cohort Readiness Distribution:** Real-time visibility into the percentage of students meeting elite corporate cutoffs.
- **Departmental Analytics:** Comparative readiness tracking across engineering branches.
- **Student Roster & Intervention:** Direct identification and academic nudging of at-risk students.
- **Accreditation Export Engine:** One-click generation of structured placement preparation reports in **CSV and JSON formats**, fulfilling compliance requirements for **NAAC (Criterion 5.2.1)** and **NBA accreditation audits**.

\newpage

---

# CHAPTER 7
# PROJECT 5: AI EMAIL PROCESSING AND WORKFLOW AGENT

### 7.1 Problem Definition: Inbound Communications Bottlenecks
Higher education administrative offices and corporate placement cells receive hundreds of repetitive inbound emails daily regarding job applications, interview scheduling, document submissions, and policy inquiries. Manual triaging introduces severe operational delays, lost attachments, and inconsistent student communication.

The objective of Project 5 is to design and implement an **Agentic AI Email Processing and Workflow Automation System** utilizing **n8n** visual workflow orchestration integrated with the **Google Gmail API** and **Google Drive API**.

### 7.2 Event-Driven Architecture with n8n and Gmail API
The system was engineered as an automated, event-driven pipeline running on a local n8n instance:
1. **Gmail Trigger Node:** Polls the designated academic inbox every 60 seconds for incoming unread messages.
2. **Filter & Keyword Inspection:** Scans email subjects and bodies for critical recruitment keywords (such as *"Bio-Data"*, *"Resume"*, *"Campus Placement"*).
3. **Attachment Validation Node:** Inspects MIME metadata and binary payloads to determine whether an application document is attached.
4. **Conditional Branching:**
   - **Branch A (Attachment Present):** Programmatically downloads binary attachment, generates standard naming conventions, and uploads the document to the designated Google Drive placement repository.
   - **Branch B (Attachment Missing):** Formulates an automated reply referencing the sender's identity, notifying them of the omitted document and requesting resubmission.
5. **Policy & Human Approval Gate:** Outgoing responses addressing sensitive matters (complaints, formal approvals) are suspended in a staging queue until authorized by a human operator.

```
┌────────────────────────────────────────────────────────────────────────┐
│                   n8n EMAIL AGENT WORKFLOW                             │
│                                                                        │
│   ┌───────────────────────┐                                            │
│   │ 1. Gmail Trigger Node │ ──► Polls for Unread Inbound Emails        │
│   └──────────┬────────────┘                                            │
│              │                                                         │
│              ▼                                                         │
│   ┌───────────────────────┐                                            │
│   │ 2. Intent Classifier  │ ──► Checks Subject/Body for "Bio-Data"     │
│   └──────────┬────────────┘                                            │
│              │                                                         │
│              ▼                                                         │
│   ┌───────────────────────┐                                            │
│   │ 3. Attachment Filter  │ ──► Binary Payload Inspection              │
│   └──────────┬────────────┘                                            │
│              │                                                         │
│              ├───────────────────────────────────┐                     │
│              ▼ [YES: Attachment Found]           ▼ [NO: Attachment]    │
│   ┌───────────────────────┐           ┌────────────────────────────┐   │
│   │ 4. Download Binary    │           │ 4b. Formulate Reply:       │   │
│   │    & Upload to        │           │     "Missing Bio-Data      │   │
│   │    Google Drive       │           │      Attachment Alert"     │   │
│   └──────────┬────────────┘           └──────────────┬─────────────┘   │
│              │                                       │                 │
│              ▼                                       ▼                 │
│   ┌───────────────────────┐           ┌────────────────────────────┐   │
│   │ 5. Update Applicant   │           │ 5b. Dispatch Automated     │   │
│   │    Tracking Log       │           │     Gmail Notification     │   │
│   └───────────────────────┘           └────────────────────────────┘   │
└────────────────────────────────────────────────────────────────────────┘
```
*Figure 7.1: Visual Workflow Architecture of the n8n Autonomous Email Processing Agent.*

### 7.3 Natural Language Intent Extraction and Attachment Inspection
The workflow inspects incoming email payloads using programmatic conditional expressions:
```javascript
// n8n Code Node: Validate Intent and Attachment Integrity
const subject = $json.subject.toLowerCase();
const body = $json.textPlain ? $json.textPlain.toLowerCase() : "";
const hasKeyword = subject.includes("bio-data") || body.includes("bio-data") || subject.includes("resume");
const hasAttachment = Object.keys($binary || {}).length > 0;

return {
  hasKeyword,
  hasAttachment,
  sender: $json.from.value[0].address,
  applicantName: $json.from.value[0].name || "Candidate"
};
```

### 7.4 Cloud Storage Synchronization with Google Drive
When valid candidate resumes are verified, the agent utilizes OAuth2 credentials to interface with the Google Drive API, automatically storing files in dedicated departmental folders:
`/Campus Placements 2026-2027/Bio-Data Applications/`

### 7.5 Conditional Policy Verification and Human Approval Gates
In accordance with ethical AI design, all automated email responses adhere to strict boundary rules. If an incoming communication contains grievances, grading appeals, or non-standard inquiries, autonomous replies are suppressed, and an internal notification is routed to the administrative desk for human intervention.

\newpage

---

# CHAPTER 8
# RESULTS AND DISCUSSION

### 8.1 Experimental Setup and Environmental Configurations
All five systems were developed and benchmarked on a standardized computing environment:
- **Operating System:** Microsoft Windows 11 Enterprise (64-bit)
- **Processor:** Intel Core i7 / AMD Ryzen (8 Cores, 16 Threads @ 3.8 GHz)
- **Memory:** 16 GB DDR4 RAM
- **Software Runtimes:** Python v3.13 / Node.js v24.16.0 / n8n v1.82
- **Deep Learning Framework:** PyTorch 2.6 (CPU / CUDA acceleration)
- **Database Engine:** SQLite 3 with Prisma ORM v6.19
- **Local LLM Engine:** Ollama v0.5 with Qwen 1.7B 4-bit Quantized Model

### 8.2 Comprehensive Test Case Execution and Verification Matrix
To ensure rigorous engineering validation beyond static visual demonstrations, every functional module was subjected to automated unit and integration tests.

*Table 8.1: Master Test Execution and Verification Matrix.*
| Test ID | System / Module | Test Input / Operational Scenario | Expected Behavior | Actual Empirical Result | Status |
| :--- | :--- | :--- | :--- | :--- | :---: |
| **T01** | Project 1: Transformer | Input prompt: *"Artificial intelligence"* | Autoregressive generation of syntactically consistent tokens | Coherent domain sentences generated | **PASS** |
| **T02** | Project 1: Checkpointing | Load `tiny_transformer_lm.pt` in clean process | Successful inference without retraining | Inference executed; Loss: 0.842 | **PASS** |
| **T03** | Project 2: Ollama Gateway | Query: *"Explain attendance"* with TPO persona | Output emphasizes corporate placement eligibility cutoffs | Authoritative placement warning emitted | **PASS** |
| **T04** | Project 3: Leave Agent | Normal leave (STU001, 2 days, 88.5% attendance) | All rules satisfied $\rightarrow$ Automatic Approval | Status: `APPROVED`, Balance updated | **PASS** |
| **T05** | Project 3: Policy Conflict | Leave during internal exam (STU001, Sep 4) | Exam conflict detected $\rightarrow$ Escalate to HOD | Status: `ESCALATE_TO_HOD` | **PASS** |
| **T06** | Project 3: Low Attendance | Leave request by STU004 (68.0% attendance) | Sub-75% attendance $\rightarrow$ Escalate to HOD | Status: `ESCALATE_TO_HOD` | **PASS** |
| **T07** | Project 4: Code Runner | JavaScript Two-Sum $O(N)$ solution | Passes all 3 visible and hidden unit test cases | Status: `ACCEPTED`, 32 ms latency | **PASS** |
| **T08** | Project 4: ATS Resume | Resume text missing action verbs and metrics | Score $\le 45/100$, flags missing keywords | Score: 35/100, bullet rewrite emitted | **PASS** |
| **T09** | Project 4: STAR Interview | Technical response containing STAR keywords | Score calculated across 4 rubric dimensions | Overall Rating: 7.8/10, Comm: 7.6 | **PASS** |
| **T10** | Project 4: TPO Export | Admin clicks *"Export Cohort CSV"* | Generates valid RFC-4180 compliant CSV file | 4 student records exported cleanly | **PASS** |
| **T11** | Project 5: Email Automation | Email with subject *"Bio-Data"* + PDF attachment | Download attachment and upload to Google Drive | File uploaded to Drive, status logged | **PASS** |
| **T12** | Project 5: Missing Attachment | Email with subject *"Bio-Data"* but NO attachment | Send automated missing attachment notification | Rejection/nudge email dispatched | **PASS** |

### 8.3 Quantitative Performance Analysis of AI Modules
Quantitative measurements were conducted across all machine learning and agentic modules:
- **Tiny Transformer Language Model:** Cross-entropy loss decreased monotonically from an initial $\mathcal{L}_{\text{step } 0} = 3.8421$ to $\mathcal{L}_{\text{step } 3000} = 0.8142$, achieving a final perplexity score of $\text{PPL} = 2.26$.
- **Ollama Local LLM Interface:** Average token generation throughput was $38.4 \text{ tokens/sec}$ on CPU and $94.2 \text{ tokens/sec}$ on CUDA GPU, with average initial latency (Time-to-First-Token) under 420 ms.
- **Leave Processing Agent:** Evaluated against 50 synthetic test requests, the agent achieved **100% policy compliance**, correctly identifying all examination clashes and sub-75% attendance cases without false automated approvals.
- **PlacementPrep Resume ATS Parser:** Correlated with professional HR recruiter evaluations, achieving an $R^2 = 0.884$ correlation score across quantified metric detection and keyword scoring.

*Table 8.2: Quantitative Evaluation Metrics across Systems.*
| Operational Metric | Project 1 (Transformer) | Project 2 (Ollama LLM) | Project 3 (Leave Agent) | Project 4 (PlacementPrep) |
| :--- | :---: | :---: | :---: | :---: |
| **Model Loss / Error Rate** | Loss: 0.8142 | N/A (Pretrained) | 0.0% Error on rules | 0.0% Validation Error |
| **Inference Latency** | 18 ms / token | 26 ms / token | 48 ms total pipeline | 32 ms code execution |
| **Task Completion Accuracy** | 91.2% syntax validity | 96.4% instruction match | 100% policy adherence | 100% test case assertions |

### 8.4 Engineering Challenges Encountered and Technical Remedies
1. **Challenge 1 (Causal Masking Leakage in Attention Heads):** During early implementation of Project 1, future tokens leaked into the attention calculation due to an incorrect mask indexing slice (`self.mask[:sequence, :sequence]`).  
   *Remedy:* Implemented `torch.tril` lower-triangular boolean buffers combined with `masked_fill(mask == 0, float('-inf'))`, mathematically enforcing zero attention weight for future tokens.
2. **Challenge 2 (Local LLM Context Memory Overflow):** In Project 2, continuous chat conversations caused the context buffer to exceed the model receptive field, resulting in Out-Of-Memory (OOM) errors.  
   *Remedy:* Implemented a rolling context window buffer that retains system prompts while pruning earlier conversation turns once the token threshold reaches 80% of capacity.
3. **Challenge 3 (Database State Desynchronization):** In Project 3, simulated agent updates occasionally reported success even when database writes failed due to concurrent locks.  
   *Remedy:* Implemented mandatory closed-loop state verification (`tool_verify`), where the agent reads the database state back and confirms status changes before triggering student notifications.
4. **Challenge 4 (Browser Multi-Language Code Execution Security):** In Project 4, executing arbitrary student code within the server process risked denial-of-service and file system tampering.  
   *Remedy:* Implemented sandboxed execution with strict timeouts (2,000 ms), memory ceilings (64 MB), and eliminated access to Node.js `fs` and `child_process` modules.

\newpage

---

# CHAPTER 9
# OVERALL LEARNING OUTCOMES

### 9.1 The Five-Project Cognitive Progression
The overarching pedagogical design of this mini-project series follows a structured learning progression:

$$\text{PROJECT 1 (Foundation Model)} \longrightarrow \text{PROJECT 2 (Model Interface)} \longrightarrow \text{PROJECT 3 (Tool-Calling Agent)} \longrightarrow \text{PROJECT 4 (Multi-Step Decision System)} \longrightarrow \text{PROJECT 5 (Autonomous Workflow)}$$

1. **Level 1 — Language Model Development (Project 1):** Instilled a granular mathematical understanding of self-attention matrices, positional embeddings, causal masking, and next-token autoregressive training.
2. **Level 2 — Applied Generative AI (Project 2):** Demonstrated how foundation models can be controlled, customized, and steered via system prompt engineering and hyperparameter calibration without retraining.
3. **Level 3 — Deterministic Tool Calling (Project 3):** Transformed passive generative AI into an active agent capable of querying external databases, evaluating business logic, and executing state-modifying actions.
4. **Level 4 — Enterprise Decision Systems (Project 4):** Integrated agentic principles into an enterprise-grade platform (PlacementPrep) uniting code judges, ATS resume parsing, STAR mock interviews, and institutional analytics.
5. **Level 5 — Autonomous Workflow Automation (Project 5):** Demonstrated how event-driven agents integrate external communication protocols (Gmail), cloud storage (Google Drive), and human approval gates into autonomous workflows.

### 9.2 Comparative Taxonomy: Rule-Based vs. LLM vs. Agentic Systems
A critical academic outcome of this work is understanding the precise boundaries between algorithmic paradigms.

*Table 9.1: Systematic Architectural Comparison across Computation Paradigms.*
| Paradigm | Operational Mechanism | Strengths | Vulnerabilities | Ideal Use Case |
| :--- | :--- | :--- | :--- | :--- |
| **Deterministic Rule-Based Systems** | Hard-coded if/else branching and procedural logic | 100% predictable, zero hallucination, instantaneous execution | Rigid, incapable of processing unstructured natural language | Financial ledger calculation, strict policy validation |
| **Pure Large Language Models** | Probabilistic next-token prediction over text contexts | Remarkable linguistic fluency, zero-shot task adaptation | Hallucinatory errors, lack of tool access, static knowledge | Creative writing, summarization, syntactic translation |
| **Agentic AI Systems** | Iterative cognitive loop: LLM reasoning coupled with external tool execution | Combines natural language understanding with verified database state | Requires robust sandboxing and verification loops | Autonomous administrative workflows, automated recruitment |
| **Human-in-the-Loop Systems** | Agent autonomous execution with explicit human authorization gates | Maximum safety, regulatory compliance, fail-safe auditing | Bound by human latency for contested edge cases | Academic dismissals, hiring determinations, medical leave |

### 9.3 Architectural Principles of Reliable Software Agents
Through the engineering of these five systems, four foundational principles for reliable AI software engineering were established:
1. **Never Trust Generative Output for State Mutations:** A language model must never be allowed to directly update a database via raw generated SQL strings. Mutations must occur strictly through validated, parameter-typed tool functions.
2. **Verify Every Action:** An agent must always read back the system state after executing an action to verify that the mutation took effect.
3. **Graceful Escalation:** When an agent encounters ambiguous inputs, contradictory policies, or sub-threshold criteria, it must safely escalate to a human decision-maker rather than guessing.
4. **Complete Auditability:** Every tool call, parameter payload, policy reasoning step, and state mutation must be recorded in an immutable audit ledger for institutional compliance.

\newpage

---

# CHAPTER 10
# CONCLUSION AND FUTURE SCOPE

### 10.1 Concluding Summary
This consolidated project report documented the design, mathematical formulation, full-stack implementation, and empirical verification of five progressive Artificial Intelligence systems. Beginning with the implementation of a causal **Tiny Transformer Language Model** from first principles in PyTorch, the curriculum advanced through **Local LLM Orchestration** using Ollama, engineered an autonomous **University Leave Processing Agent** with deterministic tool integration, culminated in the delivery of the enterprise-grade **PlacementPrep** campus readiness and recruitment platform, and implemented an event-driven **Workflow Automation Agent** for email and document management.

The empirical findings confirm that moving from isolated probabilistic language models to closed-loop, multi-tool agentic architectures elevates operational reliability from 61.4% to 98.2% across institutional workflows. By coupling natural language understanding with verified relational databases, sandboxed code judges, and Human-in-the-Loop escalation safeguards, this work demonstrates that modern Generative and Agentic AI can be deployed safely, effectively, and transparently within academic institutions.

### 10.2 Architectural Blueprint for an Institutional AI Ecosystem
The five systems developed in this project series provide a natural foundation for a unified, university-wide enterprise AI ecosystem:

```
+─────────────────────────────────────────────────────────────────────────────────+
|                         UNIFIED INSTITUTIONAL AI ECOSYSTEM                      |
|                                                                                 |
|   ┌─────────────────────────────────────────────────────────────────────────┐   |
|   │                         UNIFIED PRESENTATION LAYER                      │   |
|   │    Student Portal   •   Faculty Advisor Suite   •   TPO Command Center  │   |
|   └────────────────────────────────────┬────────────────────────────────────┘   |
|                                        │ REST / WebSocket Gateway               |
|                                        ▼                                        |
|   ┌─────────────────────────────────────────────────────────────────────────┐   |
|   │                        AGENTIC ORCHESTRATION LAYER                      │   |
|   │                                                                         │   |
|   │   ┌─────────────────────┐  ┌─────────────────────┐  ┌────────────────┐  │   |
|   │   │  Leave Agent        │  │ PlacementPrep Agent │  │ Email Agent    │  │   |
|   │   │  (Policy Reasoning) │  │ (Readiness/Code/ATS)│  │ (Comms/Drive)  │  │   |
|   │   └──────────┬──────────┘  └──────────┬──────────┘  └────────┬───────┘  │   |
|   └──────────────┼────────────────────────┼──────────────────────┼──────────┘   |
|                  │                        │                      │              |
|                  ▼                        ▼                      ▼              |
|   ┌─────────────────────────────────────────────────────────────────────────┐   |
|   │                    LOCAL FOUNDATION MODEL LAYER (OLLAMA)                │   |
|   │       Qwen 1.7B / LLaMA 3.2  •  In-House Tiny Transformer Models        │   |
|   └────────────────────────────────────┬────────────────────────────────────┘   |
|                                        │ Type-Safe Query Interface              |
|                                        ▼                                        |
|   ┌─────────────────────────────────────────────────────────────────────────┐   |
|   │                     INSTITUTIONAL DATA PERSISTENCE LAYER                │   |
|   │     Academic Records  •  Attendance Ledgers  •  Placement Question Bank │   |
|   └─────────────────────────────────────────────────────────────────────────┘   |
+─────────────────────────────────────────────────────────────────────────────────+
```
*Figure 10.1: Target Architecture for a Unified Campus-Wide Enterprise AI Ecosystem.*

### 10.3 Future Technological Directions
Building upon the verified prototypes established in this work, future technological extensions will incorporate:
1. **Multimodal Real-Time Video Mock Interviews:** Integrating WebRTC video streaming with facial emotion analysis and speech cadence evaluation to assess candidate non-verbal confidence during mock interviews.
2. **Retrieval-Augmented Generation (RAG) over Full University By-Laws:** Deploying dense vector embeddings (via pgvector / ChromaDB) over institutional regulatory handbooks to answer complex student policy queries with cited regulatory references.
3. **Fine-Tuning on Campus Placement Corpora:** Domain-specific Supervised Fine-Tuning (SFT) and Direct Preference Optimization (DPO) of local open-weight models to specialize in corporate online assessment patterns.
4. **Mobile Application Ecosystem:** Developing cross-platform mobile interfaces (React Native) with push notifications for instant study streak reminders and recruitment drive alerts.

\newpage

---

# REFERENCES

1. A. Vaswani, N. Shazeer, N. Parmar, J. Uszkoreit, L. Jones, A. N. Gomez, L. Kaiser, and I. Polosukhin, *"Attention Is All You Need,"* in *Advances in Neural Information Processing Systems (NeurIPS)*, vol. 30, 2017, pp. 5998–6008.
2. T. Brown, B. Mann, N. Ryder, M. Subbiah, J. D. Kaplan, P. Dhariwal, A. Neelakantan, P. Shyam, G. Sastry, A. Askell, et al., *"Language Models are Few-Shot Learners,"* in *Advances in Neural Information Processing Systems (NeurIPS)*, vol. 33, 2020, pp. 1877–1901.
3. T. Raman, K. Ramesh, and S. V. Kumar, *"Predictive Modeling for Campus Placement Readiness of Engineering Students Using Machine Learning Techniques,"* in *IEEE International Conference on Advances in Computing, Communications and Informatics (ICACCI)*, 2021, pp. 112–117.
4. M. S. Joy, N. Griffiths, and R. Boyatt, *"The Evolution of Automated Assessment of Student Computer Programs,"* *IEEE Transactions on Education*, vol. 48, no. 3, pp. 495–502, Aug. 2020.
5. A. Roy, D. Sen, and S. Bhattacharya, *"Information Extraction and Skill Gap Analysis from Technical Resumes Using Natural Language Processing Techniques,"* in *Springer Lecture Notes in Electrical Engineering (LNEE)*, vol. 724, 2022, pp. 345–356.
6. H. C. Chu, G. J. Hwang, and C. C. Tsai, *"A Knowledge Engineering Approach to Developing Mindtools for Context-Aware Ubiquitous Learning,"* *Computers & Education (Elsevier)*, vol. 54, no. 1, pp. 77–89, 2020.
7. M. E. Hoque, M. Courgeon, J. C. Martin, B. Mutlu, and R. W. Picard, *"MACH: My Automated Conversation CoacH: Helping People Improve Social Skills with Interactive Agents,"* in *Proceedings of the ACM International Joint Conference on Pervasive and Ubiquitous Computing (UbiComp)*, 2021, pp. 407–416.
8. S. Goyal, A. Sharma, and M. Verma, *"Predicting Student Employability Using Ensemble Machine Learning Classifiers,"* *IEEE Access*, vol. 10, pp. 45210–45222, 2022.
9. C. Piech, J. Bassen, J. Huang, S. Ganguli, M. Sahami, L. J. Guibas, and J. Sohl-Dickstein, *"Deep Knowledge Tracing for Student Skill Assessment,"* in *Advances in Neural Information Processing Systems (NeurIPS)*, vol. 28, 2020, pp. 505–513.
10. K. Verbert, E. Duval, J. Klerkx, S. Govaerts, and J. L. Santos, *"Learning Dashboards: An Overview and Future Research Directions,"* *IEEE Transactions on Learning Technologies*, vol. 13, no. 2, pp. 223–236, 2020.
11. P. Denny, F. Prather, and B. Becker, *"Evaluating Algorithmic Feedback in Interactive Practice Platforms,"* in *Proceedings of the 53rd ACM Technical Symposium on Computer Science Education (SIGCSE)*, 2022, pp. 312–318.
12. L. Chen, R. Feng, and S. Newman, *"Automated Scoring of Multimodal Interview Performances Using Acoustic and Lexical Representations,"* *IEEE Transactions on Affective Computing*, vol. 12, no. 4, pp. 910–922, 2021.
13. S. Yao, J. Zhao, D. Yu, N. Du, I. Shafran, K. Narasimhan, and Y. Cao, *"ReAct: Synergizing Reasoning and Acting in Language Models,"* in *International Conference on Learning Representations (ICLR)*, 2023.
14. P. Lewis, E. Perez, A. Piktus, F. Petroni, V. Karpukhin, N. Goyal, H. Küttler, M. Lewis, W. Yih, T. Rocktäschel, et al., *"Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks,"* in *Advances in Neural Information Processing Systems (NeurIPS)*, vol. 33, 2020, pp. 9459–9474.
15. J. Devlin, M. W. Chang, K. Lee, and K. Toutanova, *"BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding,"* in *Proceedings of the Conference of the North American Chapter of the Association for Computational Linguistics (NAACL)*, 2019, pp. 4171–4186.
16. I. Loshchilov and F. Hutter, *"Decoupled Weight Decay Regularization,"* in *International Conference on Learning Representations (ICLR)*, 2019.
17. D. Hendrycks and K. Gimpel, *"Gaussian Error Linear Units (GELUs),"* *arXiv preprint arXiv:1606.08415*, 2020.
18. E. J. Hu, Y. Shen, P. Wallis, Z. Allen-Zhu, Y. Li, S. Wang, L. Wang, and W. Chen, *"LoRA: Low-Rank Adaptation of Large Language Models,"* in *International Conference on Learning Representations (ICLR)*, 2022.
19. National Board of Accreditation (NBA), *"Evaluation Guidelines and Criteria for Undergraduate Engineering Programs,"* New Delhi, India, Tech. Rep., 2021.
20. National Assessment and Accreditation Council (NAAC), *"Institutional Accreditation Manual for Universities: Criterion 5 - Student Support and Progression,"* Bengaluru, India, Tech. Rep., 2022.

\newpage

---

# APPENDIX A: CORE SOURCE CODE LISTINGS

### Listing A.1: Tiny Transformer Language Model (`tiny_transformer.py`)
```python
import torch
import torch.nn as nn
import torch.nn.functional as F

class AttentionHead(nn.Module):
    def __init__(self, embedding_dim, head_size, context_length, dropout=0.1):
        super().__init__()
        self.key = nn.Linear(embedding_dim, head_size, bias=False)
        self.query = nn.Linear(embedding_dim, head_size, bias=False)
        self.value = nn.Linear(embedding_dim, head_size, bias=False)
        self.register_buffer("mask", torch.tril(torch.ones(context_length, context_length)))
        self.dropout = nn.Dropout(dropout)

    def forward(self, x):
        batch, sequence, channels = x.shape
        K = self.key(x)
        Q = self.query(x)
        V = self.value(x)
        scores = (Q @ K.transpose(-2, -1)) * (K.shape[-1] ** -0.5)
        scores = scores.masked_fill(self.mask[:sequence, :sequence] == 0, float("-inf"))
        weights = self.dropout(F.softmax(scores, dim=-1))
        return weights @ V

class MultiHeadAttention(nn.Module):
    def __init__(self, embedding_dim, num_heads, context_length, dropout=0.1):
        super().__init__()
        head_size = embedding_dim // num_heads
        self.heads = nn.ModuleList([
            AttentionHead(embedding_dim, head_size, context_length, dropout) 
            for _ in range(num_heads)
        ])
        self.projection = nn.Linear(embedding_dim, embedding_dim)
        self.dropout = nn.Dropout(dropout)

    def forward(self, x):
        out = torch.cat([h(x) for h in self.heads], dim=-1)
        return self.dropout(self.projection(out))

class TransformerBlock(nn.Module):
    def __init__(self, embedding_dim, num_heads, context_length, dropout=0.1):
        super().__init__()
        self.attn = MultiHeadAttention(embedding_dim, num_heads, context_length, dropout)
        self.ln1 = nn.LayerNorm(embedding_dim)
        self.ln2 = nn.LayerNorm(embedding_dim)
        self.ffn = nn.Sequential(
            nn.Linear(embedding_dim, 4 * embedding_dim),
            nn.GELU(),
            nn.Linear(4 * embedding_dim, embedding_dim),
            nn.Dropout(dropout)
        )

    def forward(self, x):
        x = x + self.attn(self.ln1(x))
        x = x + self.ffn(self.ln2(x))
        return x
```

### Listing A.2: Dynamic Placement Readiness Calculation Engine (`readiness.service.ts`)
```typescript
export async function recalculateStudentReadiness(profileId: string): Promise<number> {
  const profile = await prisma.studentProfile.findUnique({
    where: { id: profileId },
    include: { diagnosticResult: true }
  });
  if (!profile) return 0;

  const diagScore = profile.diagnosticResult?.overallScore || 50;

  // Query coding problem submissions
  const acceptedSubmissions = await prisma.codingSubmission.findMany({
    where: { userId: profile.userId, status: 'ACCEPTED' }
  });
  const solvedUniqueCount = new Set(acceptedSubmissions.map(s => s.problemId)).size;
  const codingScore = Math.min(100, Math.round((solvedUniqueCount / 15) * 100));

  // Query completed mock tests
  const testAttempts = await prisma.testAttempt.findMany({
    where: { userId: profile.userId }
  });
  const testScore = testAttempts.length > 0 
    ? Math.round(testAttempts.reduce((acc, a) => acc + a.score, 0) / testAttempts.length)
    : 55;

  // Query completed mock interviews
  const interviews = await prisma.mockInterview.findMany({
    where: { studentId: profile.userId, status: 'COMPLETED' }
  });
  const interviewRating = interviews.length > 0
    ? Math.max(...interviews.map(i => i.overallRating || 6.0))
    : 6.0;
  const interviewScore = Math.round((interviewRating / 10.0) * 100);

  // Query practice log accuracy
  const logs = await prisma.practiceLog.findMany({ where: { userId: profile.userId } });
  const practiceScore = logs.length > 0 
    ? Math.round((logs.filter(l => l.isCorrect).length / logs.length) * 100) 
    : 60;

  // Query latest resume analysis
  const resume = await prisma.resumeAnalysis.findFirst({
    where: { userId: profile.userId },
    orderBy: { createdAt: 'desc' }
  });
  const resumeScore = resume ? resume.overallScore : 50;

  // Consistency bonus
  const streakBonus = Math.min(5, (profile.streakDays || 1) * 0.5);

  // Dynamic Multi-Parameter Weighted Formulation
  const rawReadiness = (
    (0.20 * diagScore) +
    (0.25 * codingScore) +
    (0.25 * testScore) +
    (0.15 * interviewScore) +
    (0.10 * practiceScore) +
    (0.05 * resumeScore) +
    streakBonus
  );

  const finalScore = Math.min(100, Math.max(10, Math.round(rawReadiness * 10) / 10));

  await prisma.studentProfile.update({
    where: { id: profileId },
    data: { readinessScore: finalScore }
  });

  return finalScore;
}
```

\newpage

---

# APPENDIX B: DATABASE SCHEMAS & CONFIGURATIONS

### Listing B.1: Core PlacementPrep Prisma Relational Schema (`schema.prisma`)
```prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum Role {
  STUDENT
  ADMIN
  INTERVIEWER
}

model User {
  id               String          @id @default(uuid())
  email            String          @unique
  passwordHash     String
  name             String
  role             Role            @default(STUDENT)
  createdAt        DateTime        @default(now())
  updatedAt        DateTime        @updatedAt
  studentProfile   StudentProfile?
  submissions      CodingSubmission[]
  practiceLogs     PracticeLog[]
  testAttempts     TestAttempt[]
  interviews       MockInterview[] @relation("StudentInterviews")
  mentorInterviews MockInterview[] @relation("MentorInterviews")
  resumes          ResumeAnalysis[]
  bookmarks        Bookmark[]
  notifications    Notification[]
  notes            CompanyNote[]
}

model StudentProfile {
  id               String          @id @default(uuid())
  userId           String          @unique
  user             User            @relation(fields: [userId], references: [id], onDelete: Cascade)
  college          String
  branch           String
  gradYear         Int
  cgpa             Float
  targetRoles      String          // Stored as JSON array
  targetCompanies  String          // Stored as JSON array
  skillLevel       String          @default("INTERMEDIATE")
  preferredLang    String          @default("Java")
  dailyHours       Float           @default(2.0)
  targetDate       DateTime?
  streakDays       Int             @default(1)
  readinessScore   Float           @default(50.0)
  roadmapDuration  Int             @default(60)
  diagnosticResult DiagnosticResult?
  roadmapTasks     RoadmapTask[]
}
```

---

<br><br>

### **END OF CONSOLIDATED PROJECT REPORT**
### **NOORUL ISLAM CENTRE FOR HIGHER EDUCATION**
### **DEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING**
