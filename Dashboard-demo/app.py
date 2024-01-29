import streamlit as st
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.dates as mdates
from datetime import datetime


def load_data():
    data = pd.read_csv("test.csv")
    data["Scheduled-Date"] = pd.to_datetime(data["Scheduled-Date"])
    data["Completed-on"] = pd.to_datetime(data["Completed-on"], errors="coerce")
    data["Equipment Class"] = data["Equipment"].apply(
        lambda x: "TSD" if "TSD" in x else "Mixer"
    )
    return data


data = load_data()

# Streamlit sidebar filters
area = st.sidebar.selectbox("Select Area", ["All", "WPB", "SPB"])
equipment_class = st.sidebar.selectbox(
    "Select Equipment Class", ["All", "TSD", "Mixer"]
)
delay_threshold = st.sidebar.slider(
    "Minimum Delay Days", min_value=0, max_value=30, value=5
)
start_date, end_date = st.sidebar.select_slider(
    "Select Date Range",
    options=pd.to_datetime(sorted(data["Scheduled-Date"].unique())),
    value=(
        min(pd.to_datetime(data["Scheduled-Date"])),
        max(pd.to_datetime(data["Scheduled-Date"])),
    ),
)

# Filtering data
if area != "All":
    data = data[data["Area"] == area]
if equipment_class != "All":
    data = data[data["Equipment Class"] == equipment_class]

data = data[
    (data["Scheduled-Date"] >= start_date) & (data["Scheduled-Date"] <= end_date)
]


# Function to plot Gantt-like chart
def plot_gantt(data, delay_threshold):
    fig, ax = plt.subplots(figsize=(15, 10))
    colors = {"TSD": "skyblue", "Mixer": "lightgreen", "Delayed": "red"}

    for idx, row in data.iterrows():
        delay = (
            (row["Completed-on"] - row["Scheduled-Date"]).days
            if pd.notnull(row["Completed-on"])
            else (datetime.now() - row["Scheduled-Date"]).days
        )
        if delay > delay_threshold:
            color = (
                "Delayed" if pd.isnull(row["Completed-on"]) else row["Equipment Class"]
            )
            end_date = (
                row["Completed-on"]
                if pd.notnull(row["Completed-on"])
                else datetime.now()
            )
            ax.barh(
                row["Equipment"], delay, left=row["Scheduled-Date"], color=colors[color]
            )
            ax.text(
                row["Scheduled-Date"],
                row["Equipment"],
                row["Equipment"],
                fontsize=8,
                verticalalignment="center",
            )

    ax.set_xlabel("Date")
    ax.set_ylabel("Equipment")
    ax.set_title("Maintenance Schedule Gantt Chart")
    ax.xaxis.set_major_locator(mdates.MonthLocator())
    ax.xaxis.set_major_formatter(mdates.DateFormatter("%b %d, %Y"))
    plt.xticks(rotation=45)
    plt.grid(axis="x")
    return fig


# Plot and display the Gantt chart
gantt_chart = plot_gantt(data, delay_threshold)
st.pyplot(gantt_chart)
